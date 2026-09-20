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
  const [selectedStake, setSelectedStake] = useState<Record<string, number>>({});
  const [userId, setUserId] = useState('user-1');
  const [balance, setBalance] = useState<number>(2500);

  useEffect(() => {
    fetch('http://localhost:3001/api/sportsbook/matches')
      .then((res) => res.json())
      .then(setMatches)
      .catch(console.error);

    const raw = localStorage.getItem('primebet-user');
    if (raw) {
      const parsed = JSON.parse(raw);
      setUserId(parsed.id || 'user-1');
      setBalance(parsed.balance || 2500);
    }
  }, []);

  const placeBet = async (matchId: string, selection: string) => {
    const stake = selectedStake[matchId] || 25;
    const res = await fetch('http://localhost:3001/api/sportsbook/bet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, matchId, selection, stake }),
    });
    const data = await res.json();
    if (data.ok) {
      setBalance(data.balance);
      const saved = JSON.parse(localStorage.getItem('primebet-user') || '{}');
      if (saved.id) {
        saved.balance = data.balance;
        localStorage.setItem('primebet-user', JSON.stringify(saved));
      }
      alert(`Bet placed on ${selection} for $${stake}`);
    } else {
      alert(data.message);
    }
  };

  return (
    <main className="page-shell">
      <div className="page-header-row">
        <h1>Sportsbook</h1>
        <div className="pill-green">Balance: ${balance}</div>
      </div>

      <div className="stack-list">
        {matches.map((match) => (
          <div key={match.id} className="card-panel">
            <div className="match-row">
              <div>
                <div className="muted-label">{match.league}</div>
                <h3>{match.home} vs {match.away}</h3>
              </div>
              <div className="muted-label">{new Date(match.startAt).toLocaleString()}</div>
            </div>

            <div className="inline-controls">
              <input
                type="number"
                min={5}
                step={5}
                value={selectedStake[match.id] || 25}
                onChange={(e) => setSelectedStake((prev) => ({ ...prev, [match.id]: Number(e.target.value) }))}
              />
            </div>

            <div className="odds-row">
              {match.markets.map((market) => (
                <button
                  key={market.label}
                  className="bet-btn"
                  onClick={() => placeBet(match.id, market.label)}
                >
                  {market.label}
                  <span>{market.odds}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
