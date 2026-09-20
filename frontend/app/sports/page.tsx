'use client';

import { useEffect, useState } from 'react';

type Match = {
  id: string;
  home: string;
  away: string;
  league: string;
  startAt: string;
  markets: { label: string; odds: number }[];
};

export default function SportsPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [userId, setUserId] = useState('user-1');

  useEffect(() => {
    fetch('http://localhost:3001/api/sportsbook/matches')
      .then((res) => res.json())
      .then(setMatches)
      .catch(console.error);
  }, []);

  const placeBet = async (matchId: string, selection: string, stake: number) => {
    const res = await fetch('http://localhost:3001/api/sportsbook/bet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, matchId, selection, stake }),
    });
    const data = await res.json();
    alert(data.ok ? `Bet placed: ${selection} @ ${data.bet.odds}` : data.message);
  };

  return (
    <main style={{ padding: 32, background: '#0b1020', color: '#f8fafc', minHeight: '100vh' }}>
      <h1 style={{ fontSize: 42, marginBottom: 20 }}>Sportsbook</h1>
      <div style={{ display: 'grid', gap: 20 }}>
        {matches.map((match) => (
          <div key={match.id} style={{ background: '#111827', borderRadius: 18, padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ color: '#7dd3fc', fontWeight: 700 }}>{match.league}</div>
                <h3 style={{ margin: '8px 0' }}>{match.home} vs {match.away}</h3>
              </div>
              <div>{new Date(match.startAt).toLocaleString()}</div>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 16 }}>
              {match.markets.map((market) => (
                <button
                  key={market.label}
                  style={{ background: '#1e293b', color: '#f8fafc', padding: '10px 16px', border: 'none', borderRadius: 12, cursor: 'pointer' }}
                  onClick={() => placeBet(match.id, market.label, 25)}
                >
                  {market.label} ({market.odds})
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
