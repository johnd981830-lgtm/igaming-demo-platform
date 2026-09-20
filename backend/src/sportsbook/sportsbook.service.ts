import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { bets, ledger, matches, users } from '../mock-data';

@Injectable()
export class SportsbookService {
  getMatches() {
    return matches;
  }

  getUserBets(userId: string) {
    return bets.filter((bet) => bet.userId === userId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
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
    ledger.unshift({
      id: uuid(),
      userId,
      type: 'bet',
      amount: stake,
      currency: 'USD',
      createdAt: new Date().toISOString(),
      description: `Bet on ${match.home} vs ${match.away} (${selection})`,
    });

    return {
      ok: true,
      bet: newBet,
      balance: user.balance,
      bets: this.getUserBets(userId),
    };
  }
}
