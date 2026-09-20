import { Injectable } from '@nestjs/common';
import { bets, games, ledger, users } from '../mock-data';

@Injectable()
export class AdminService {
  getStats() {
    const totalPlayers = users.filter((u) => u.role === 'user').length;
    const totalBalance = users.reduce((sum, user) => sum + user.balance, 0);
    const activeBets = bets.filter((bet) => bet.status === 'open').length;
    const totalTurnover = ledger.reduce((sum, entry) => sum + entry.amount, 0);

    return {
      totalPlayers,
      totalBalance,
      activeBets,
      totalTurnover,
      totalGames: games.length,
      recentActivity: bets.slice(-5).reverse(),
    };
  }
}
