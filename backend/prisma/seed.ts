import { PrismaClient, UserRole, LedgerType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({ where: { email: 'user@demo.com' }, update: {}, create: { email: 'user@demo.com', password: 'demo123', username: 'demo_player', balance: 2500 } });
  await prisma.user.upsert({ where: { email: 'admin@demo.com' }, update: {}, create: { email: 'admin@demo.com', password: 'admin123', username: 'admin_master', balance: 100000, role: UserRole.ADMIN } });
  const initial = await prisma.ledgerEntry.findFirst({ where: { userId: user.id, description: 'Initial deposit' } });
  if (!initial) await prisma.ledgerEntry.create({ data: { userId: user.id, type: LedgerType.DEPOSIT, amount: 2500, description: 'Initial deposit' } });

  const matches = [
    { id: 'match-1', home: 'Manchester City', away: 'Arsenal', league: 'Premier League', startAt: new Date('2099-10-01T18:30:00Z'), markets: [['Home Win', 1.9], ['Draw', 3.4], ['Away Win', 3.8]] },
    { id: 'match-2', home: 'Real Madrid', away: 'Barcelona', league: 'La Liga', startAt: new Date('2099-10-02T20:00:00Z'), markets: [['Home Win', 2.1], ['Draw', 3.5], ['Away Win', 2.8]] },
    { id: 'match-3', home: 'PSG', away: 'Juventus', league: 'Champions League', startAt: new Date('2099-10-03T19:45:00Z'), markets: [['Home Win', 1.7], ['Draw', 3.8], ['Away Win', 4.3]] },
  ] as const;
  for (const match of matches) {
    await prisma.match.upsert({ where: { id: match.id }, update: { home: match.home, away: match.away, league: match.league, startAt: match.startAt }, create: { id: match.id, home: match.home, away: match.away, league: match.league, startAt: match.startAt, markets: { create: match.markets.map(([label, odds]) => ({ label, odds })) } } });
    for (const [label, odds] of match.markets) await prisma.market.upsert({ where: { matchId_label: { matchId: match.id, label } }, update: { odds }, create: { matchId: match.id, label, odds } });
  }

  const games = [['game-1', 'Lucky Gold', 'Slots', 'Medium', 96.5, 'NetEnt', '🎰'], ['game-2', 'Blackjack Royale', 'Table', 'Low', 98.2, 'Evolution', '🃏'], ['game-3', 'Turbo Dice', 'Instant', 'High', 95.8, 'Pragmatic Play', '🎲']] as const;
  for (const [id, title, category, volatility, rtp, provider, image] of games) await prisma.game.upsert({ where: { id }, update: { title, category, volatility, rtp, provider, image }, create: { id, title, category, volatility, rtp, provider, image } });
}

main().finally(() => prisma.$disconnect());
