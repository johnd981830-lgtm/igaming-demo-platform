import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async getStats() {
    const [totalPlayers, totalBalance, activeBets, totalGames, turnover, winnings, recentActivity] = await Promise.all([
      this.prisma.user.count({ where: { role: 'USER' } }),
      this.prisma.user.aggregate({ _sum: { balance: true } }),
      this.prisma.bet.count({ where: { status: 'OPEN' } }),
      this.prisma.game.count(),
      this.prisma.ledgerEntry.aggregate({ _sum: { amount: true } }),
      this.prisma.ledgerEntry.aggregate({ where: { type: 'WIN' }, _sum: { amount: true } }),
      this.prisma.bet.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
    ]);

    return {
      totalPlayers,
      totalBalance: Number(totalBalance._sum.balance || 0),
      activeBets,
      totalTurnover: Number(turnover._sum.amount || 0),
      totalGames,
      totalWinnings: Number(winnings._sum.amount || 0),
      recentActivity: recentActivity.map((bet) => ({ ...bet, stake: Number(bet.stake), odds: Number(bet.odds) })),
    };
  }

  async getSummary() {
    const [activePlayers, pendingSettlements, transactions, revenue, markets] = await Promise.all([
      this.prisma.user.count({ where: { role: 'USER' } }),
      this.prisma.bet.count({ where: { status: 'OPEN' } }),
      this.prisma.ledgerEntry.count(),
      this.prisma.ledgerEntry.aggregate({ where: { type: { in: ['BET', 'DEPOSIT'] } }, _sum: { amount: true } }),
      this.prisma.match.findMany({ include: { bets: { select: { stake: true } } } }),
    ]);

    return {
      overview: { activePlayers, pendingSettlements, transactions, totalRevenue: Number(revenue._sum.amount || 0) },
      topMarkets: markets.map((market) => ({
        label: market.league,
        volume: market.bets.reduce((total, bet) => total + Number(bet.stake), 0),
      })),
      recentWinners: [],
    };
  }
}
