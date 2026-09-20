import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SportsbookService {
  constructor(private readonly prisma: PrismaService) {}

  async getMatches() {
    const rows = await this.prisma.match.findMany({
      include: { markets: { orderBy: { label: 'asc' } } },
      orderBy: { startAt: 'asc' },
    });

    return rows.map((match) => ({
      id: match.id,
      home: match.home,
      away: match.away,
      league: match.league,
      startAt: match.startAt,
      markets: match.markets.map((market) => ({ label: market.label, odds: Number(market.odds) })),
    }));
  }

  async getUserBets(userId: string) {
    return this.prisma.bet.findMany({
      where: { userId },
      include: { match: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async placeBet(userId: string, matchId: string, selection: string, stake: number) {
    if (!Number.isFinite(stake) || stake <= 0) return { ok: false, message: 'Stake must be positive.' };

    try {
      const result = await this.prisma.$transaction(async (tx) => {
        const [user, match, market] = await Promise.all([
          tx.user.findUnique({ where: { id: userId } }),
          tx.match.findUnique({ where: { id: matchId } }),
          tx.market.findUnique({ where: { matchId_label: { matchId, label: selection } } }),
        ]);

        if (!user) throw new Error('User not found.');
        if (!match) throw new Error('Match not found.');
        if (!market) throw new Error('Selection not found.');
        if (new Date(match.startAt).getTime() <= Date.now()) throw new Error('Betting is closed for this event.');
        if (Number(user.balance) < stake) throw new Error('Insufficient balance.');

        const balance = Number(user.balance) - stake;
        const bet = await tx.bet.create({
          data: { userId, matchId, selection, stake, odds: market.odds },
        });
        await tx.user.update({ where: { id: userId }, data: { balance } });
        await tx.ledgerEntry.create({
          data: {
            userId,
            type: 'BET',
            amount: stake,
            description: `Bet on ${match.home} vs ${match.away} (${selection})`,
          },
        });

        return { bet, balance };
      });

      return {
        ok: true,
        bet: { ...result.bet, stake: Number(result.bet.stake), odds: Number(result.bet.odds) },
        balance: result.balance,
        bets: await this.getUserBets(userId),
      };
    } catch (error: any) {
      return { ok: false, message: error.message || 'Unable to place bet.' };
    }
  }
}
