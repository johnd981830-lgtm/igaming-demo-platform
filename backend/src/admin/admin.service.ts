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
}
