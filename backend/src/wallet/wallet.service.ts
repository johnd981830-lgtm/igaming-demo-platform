import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { PrismaService } from '../prisma.service';

@Injectable()
export class WalletService {
  constructor(private readonly prisma: PrismaService) {}

  async getLedger(userId: string) { return this.prisma.ledgerEntry.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } }); }

  async changeBalance(userId: string, amount: number, type: 'DEPOSIT' | 'WITHDRAW') {
    if (!Number.isFinite(amount) || amount <= 0) return { ok: false, message: 'Amount must be greater than zero.' };
    try {
      const result = await this.prisma.$transaction(async (tx) => {
        const user = await tx.user.findUnique({ where: { id: userId } });
        if (!user) throw new Error('User not found');
        const current = Number(user.balance);
        if (type === 'WITHDRAW' && current < amount) throw new Error('Insufficient balance');
        const next = type === 'DEPOSIT' ? current + amount : current - amount;
        const updated = await tx.user.update({ where: { id: userId }, data: { balance: next } });
        await tx.ledgerEntry.create({ data: { id: uuid(), userId, type, amount, description: type === 'DEPOSIT' ? 'Deposit' : 'Withdrawal' } });
        return { balance: Number(updated.balance) };
      });
      return { ok: true, ...result, ledger: await this.getLedger(userId) };
    } catch (error: any) { return { ok: false, message: error.message }; }
  }

  deposit(userId: string, amount: number) { return this.changeBalance(userId, amount, 'DEPOSIT'); }
  withdraw(userId: string, amount: number) { return this.changeBalance(userId, amount, 'WITHDRAW'); }
}
