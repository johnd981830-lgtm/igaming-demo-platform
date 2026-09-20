import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { bets, games, ledger, users } from '../mock-data';

@Injectable()
export class CasinoService {
  getGames() {
    return games;
  }

  getRecentResults(userId: string) {
    return ledger.filter((entry) => entry.userId === userId && (entry.type === 'bet' || entry.type === 'win')).slice(0, 8);
  }

  playGame(userId: string, gameId: string, wager: number) {
    const user = users.find((u) => u.id === userId);
    const game = games.find((g) => g.id === gameId);

    if (!user) return { ok: false, message: 'User not found' };
    if (!game) return { ok: false, message: 'Game not found' };
    if (wager <= 0) return { ok: false, message: 'Wager must be positive' };
    if (user.balance < wager) return { ok: false, message: 'Insufficient balance' };

    user.balance -= wager;
    const outcomeRoll = Math.random();
    const payoutMultiplier = game.volatility === 'Low' ? 0.8 : game.volatility === 'Medium' ? 1.4 : 2.1;
    const payout = outcomeRoll > 0.45 ? Math.round(wager * (game.rtp / 100) * payoutMultiplier) : 0;

    user.balance += payout;
    const result = payout > 0 ? 'win' : 'loss';

    ledger.unshift({
      id: uuid(),
      userId,
      type: result === 'win' ? 'win' : 'bet',
      amount: result === 'win' ? payout : wager,
      currency: 'USD',
      createdAt: new Date().toISOString(),
      description: `${game.title} ${result.toUpperCase()}`,
    });

    return {
      ok: true,
      result,
      wager,
      payout,
      balance: user.balance,
      game: game.title,
      payoutId: uuid(),
      recentResults: this.getRecentResults(userId),
    };
  }
}
