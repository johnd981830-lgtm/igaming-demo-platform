import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { ledger, users } from '../mock-data';

@Injectable()
export class WalletService {
  getLedger(userId: string) {
    return ledger.filter((entry) => entry.userId === userId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  deposit(userId: string, amount: number) {
    const user = users.find((u) => u.id === userId);
    if (!user) return { ok: false, message: 'User not found' };
    if (amount <= 0) return { ok: false, message: 'Amount must be greater than zero' };

    user.balance += amount;
    ledger.unshift({
      id: uuid(),
      userId,
      type: 'deposit',
      amount,
      currency: 'USD',
      createdAt: new Date().toISOString(),
      description: 'Deposit',
    });

    return { ok: true, balance: user.balance, ledger: this.getLedger(userId) };
  }

  withdraw(userId: string, amount: number) {
    const user = users.find((u) => u.id === userId);
    if (!user) return { ok: false, message: 'User not found' };
    if (amount <= 0) return { ok: false, message: 'Amount must be greater than zero' };
    if (user.balance < amount) return { ok: false, message: 'Insufficient balance' };

    user.balance -= amount;
    ledger.unshift({
      id: uuid(),
      userId,
      type: 'withdraw',
      amount,
      currency: 'USD',
      createdAt: new Date().toISOString(),
      description: 'Withdrawal',
    });

    return { ok: true, balance: user.balance, ledger: this.getLedger(userId) };
  }
}
