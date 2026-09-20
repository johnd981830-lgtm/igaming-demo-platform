export type UserRole = 'user' | 'admin';

export type User = {
  id: string;
  email: string;
  password: string;
  username: string;
  balance: number;
  role: UserRole;
  createdAt: string;
};

export type Match = {
  id: string;
  home: string;
  away: string;
  league: string;
  startAt: string;
  markets: {
    label: string;
    odds: number;
  }[];
};

export type Game = {
  id: string;
  title: string;
  category: string;
  volatility: 'Low' | 'Medium' | 'High';
  rtp: number;
  provider: string;
  image: string;
};

export type LedgerEntry = {
  id: string;
  userId: string;
  type: 'deposit' | 'withdraw' | 'bet' | 'win';
  amount: number;
  currency: string;
  createdAt: string;
  description: string;
};

export type Bet = {
  id: string;
  userId: string;
  matchId: string;
  selection: string;
  stake: number;
  odds: number;
  status: 'open' | 'won' | 'lost';
  createdAt: string;
};

export const users: User[] = [
  {
    id: 'user-1',
    email: 'user@demo.com',
    password: 'demo123',
    username: 'demo_player',
    balance: 2500,
    role: 'user',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'admin-1',
    email: 'admin@demo.com',
    password: 'admin123',
    username: 'admin_master',
    balance: 100000,
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
];

export const matches: Match[] = [
  {
    id: 'match-1',
    home: 'Manchester City',
    away: 'Arsenal',
    league: 'Premier League',
    startAt: '2026-10-01T18:30:00Z',
    markets: [
      { label: 'Home Win', odds: 1.9 },
      { label: 'Draw', odds: 3.4 },
      { label: 'Away Win', odds: 3.8 },
    ],
  },
  {
    id: 'match-2',
    home: 'Real Madrid',
    away: 'Barcelona',
    league: 'La Liga',
    startAt: '2026-10-02T20:00:00Z',
    markets: [
      { label: 'Home Win', odds: 2.1 },
      { label: 'Draw', odds: 3.5 },
      { label: 'Away Win', odds: 2.8 },
    ],
  },
  {
    id: 'match-3',
    home: 'PSG',
    away: 'Juventus',
    league: 'Champions League',
    startAt: '2026-10-03T19:45:00Z',
    markets: [
      { label: 'Home Win', odds: 1.7 },
      { label: 'Draw', odds: 3.8 },
      { label: 'Away Win', odds: 4.3 },
    ],
  },
];

export const games: Game[] = [
  {
    id: 'game-1',
    title: 'Lucky Gold',
    category: 'Slots',
    volatility: 'Medium',
    rtp: 96.5,
    provider: 'NetEnt',
    image: '🎰',
  },
  {
    id: 'game-2',
    title: 'Blackjack Royale',
    category: 'Table',
    volatility: 'Low',
    rtp: 98.2,
    provider: 'Evolution',
    image: '🃏',
  },
  {
    id: 'game-3',
    title: 'Turbo Dice',
    category: 'Instant',
    volatility: 'High',
    rtp: 95.8,
    provider: 'Pragmatic Play',
    image: '🎲',
  },
];

export const bets: Bet[] = [];

export const ledger: LedgerEntry[] = [
  {
    id: 'ledger-1',
    userId: 'user-1',
    type: 'deposit',
    amount: 2500,
    currency: 'USD',
    createdAt: new Date().toISOString(),
    description: 'Initial deposit',
  },
];
