import { Injectable } from '@nestjs/common';
import { bets, games, ledger, users } from '../mock-data';

@Injectable()
export class AdminService {
  getStats() {
    const totalPlayers = users.filter((u) => u.role === 'user').length;
    const totalBalance = users.reduce((sum, user) => sum + user.balance, 0);
    const activeBets = bets.filter((bet) => bet.status === 'open').length;
    const totalTurnover = ledger.reduce((sum, entry) => sum + entry.amount, 0);
    const totalWinnings = ledger.filter((entry) => entry.type === 'win').reduce((sum, entry) => sum + entry.amount, 0);

    return {
      totalPlayers,
      totalBalance,
      activeBets,
      totalTurnover,
      totalGames: games.length,
      totalWinnings,
      recentActivity: bets.slice(-5).reverse().map((bet) => ({
        id: bet.id,
        matchId: bet.matchId,
        selection: bet.selection,
        stake: bet.stake,
        status: bet.status,
        createdAt: bet.createdAt,
      })),
    };
  }

  getSummary() {
    return {
      overview: {
        activePlayers: users.filter((u) => u.role === 'user').length,
        pendingSettlements: bets.filter((bet) => bet.status === 'open').length,
        transactions: ledger.length,
        totalRevenue: ledger.reduce((sum, entry) => sum + (entry.type === 'bet' || entry.type === 'deposit' ? entry.amount : 0), 0),
      },
      topMarkets: [
        { label: 'Premier League', volume: 12400 },
        { label: 'La Liga', volume: 9380 },
        { label: 'Champions League', volume: 11850 },
      ],
      recentWinners: [{ user: 'demo_player', amount: 480 }, { user: 'admin_master', amount: 280 }],
    };
  }
}
