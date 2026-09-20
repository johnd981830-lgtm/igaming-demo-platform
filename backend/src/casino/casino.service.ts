import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CasinoService {
  constructor(private readonly prisma: PrismaService) {}

  async getGames() {
    const games = await this.prisma.game.findMany({ orderBy: { title: 'asc' } });
    return games.map((game) => ({ ...game, rtp: Number(game.rtp) }));
  }

  async getRecentResults(userId: string) {
    return this.prisma.ledgerEntry.findMany({
      where: { userId, type: { in: ['BET', 'WIN'] } },
      orderBy: { createdAt: 'desc' },
      take: 8,
    });
  }

  async playGame(userId: string, gameId: string, wager: number) {
    if (!Number.isFinite(wager) || wager <= 0) return { ok: false, message: 'Wager must be positive.' };

    try {
      const result = await this.prisma.$transaction(async (tx) => {
        const [user, game] = await Promise.all([
          tx.user.findUnique({ where: { id: userId } }),
          tx.game.findUnique({ where: { id: gameId } }),
        ]);
        if (!user) throw new Error('User not found.');
        if (!game) throw new Error('Game not found.');
        if (Number(user.balance) < wager) throw new Error('Insufficient balance.');

        const roll = Math.random();
        const multiplier = game.volatility === 'Low' ? 0.8 : game.volatility === 'Medium' ? 1.4 : 2.1;
        const payout = roll > 0.45 ? Math.round(wager * (Number(game.rtp) / 100) * multiplier) : 0;
        const balance = Number(user.balance) - wager + payout;

        await tx.user.update({ where: { id: userId }, data: { balance } });
        await tx.ledgerEntry.create({
          data: { userId, type: 'BET', amount: wager, description: `${game.title} wager` },
        });
        if (payout > 0) {
          await tx.ledgerEntry.create({
            data: { userId, type: 'WIN', amount: payout, description: `${game.title} payout` },
          });
        }

        return { game: game.title, payout, balance, result: payout > 0 ? 'win' : 'loss' };
      });

      return { ok: true, ...result, payoutId: `demo-payout-${Date.now()}`, recentResults: await this.getRecentResults(userId) };
    } catch (error: any) {
      return { ok: false, message: error.message || 'Unable to play game.' };
    }
  }
}
