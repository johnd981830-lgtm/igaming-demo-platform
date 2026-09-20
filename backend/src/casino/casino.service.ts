import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { games, users } from '../mock-data';

@Injectable()
export class CasinoService {
  getGames() {
    return games;
  }

  playGame(userId: string, gameId: string, wager: number) {
    const user = users.find((u) => u.id === userId);
    const game = games.find((g) => g.id === gameId);

    if (!user) return { ok: false, message: 'User not found' };
    if (!game) return { ok: false, message: 'Game not found' };
    if (wager <= 0) return { ok: false, message: 'Wager must be positive' };
    if (user.balance < wager) return { ok: false, message: 'Insufficient balance' };

    const payout = Math.round(wager * (game.rtp / 100));
    const result = Number((Math.random() * 2).toFixed(2));
    const winAmount = result > 1 ? payout : 0;

    user.balance -= wager;
    user.balance += winAmount;

    return {
      ok: true,
      result: winAmount > 0 ? 'win' : 'loss',
      wager,
      payout: winAmount,
      balance: user.balance,
      game: game.title,
      payoutId: uuid(),
    };
  }
}
