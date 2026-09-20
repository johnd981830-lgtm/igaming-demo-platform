import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { bets, matches, users } from '../mock-data';

@Injectable()
export class SportsbookService {
  getMatches() {
    return matches;
  }

  placeBet(userId: string, matchId: string, selection: string, stake: number) {
    const user = users.find((u) => u.id === userId);
    const match = matches.find((m) => m.id === matchId);
    if (!user) return { ok: false, message: 'User not found' };
    if (!match) return { ok: false, message: 'Match not found' };
    if (stake <= 0) return { ok: false, message: 'Stake must be positive' };
    if (user.balance < stake) return { ok: false, message: 'Insufficient balance' };

    const market = match.markets.find((m) => m.label === selection);
    if (!market) return { ok: false, message: 'Selection not found' };

    user.balance -= stake;
    const newBet = {
      id: uuid(),
      userId,
      matchId,
      selection,
      stake,
      odds: market.odds,
      status: 'open',
      createdAt: new Date().toISOString(),
    };
    bets.push(newBet);

    return {
      ok: true,
      bet: newBet,
      balance: user.balance,
    };
  }
}
