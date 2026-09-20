'use client';

import { useEffect, useState } from 'react';

type Game = {
  id: string;
  title: string;
  category: string;
  volatility: string;
  rtp: number;
  provider: string;
  image: string;
};

export default function CasinoPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [userId, setUserId] = useState('user-1');
  const [balance, setBalance] = useState<number>(2500);
  const [wagers, setWagers] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch('http://localhost:3001/api/casino/games')
      .then((res) => res.json())
      .then(setGames)
      .catch(console.error);

    const raw = localStorage.getItem('primebet-user');
    if (raw) {
      const parsed = JSON.parse(raw);
      setUserId(parsed.id || 'user-1');
      setBalance(parsed.balance || 2500);
    }
  }, []);

  const playGame = async (gameId: string) => {
    const wager = wagers[gameId] || 50;
    const res = await fetch('http://localhost:3001/api/casino/play', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, gameId, wager }),
    });
    const data = await res.json();

    if (data.ok) {
      setBalance(data.balance);
      const saved = JSON.parse(localStorage.getItem('primebet-user') || '{}');
      if (saved.id) {
        saved.balance = data.balance;
        localStorage.setItem('primebet-user', JSON.stringify(saved));
      }
      alert(`${data.result.toUpperCase()} — payout: $${data.payout}`);
    } else {
      alert(data.message);
    }
  };

  return (
    <main className="page-shell">
      <div className="page-header-row">
        <h1>Casino Lobby</h1>
        <div className="pill-green">Balance: ${balance}</div>
      </div>

      <div className="game-grid">
        {games.map((game) => (
          <div key={game.id} className="card-panel game-card">
            <div className="game-icon">{game.image}</div>
            <div className="game-header">
              <h3>{game.title}</h3>
              <span>{game.category}</span>
            </div>
            <div className="game-meta">Provider: {game.provider}</div>
            <div className="game-meta">Volatility: {game.volatility}</div>
            <div className="game-meta green">RTP: {game.rtp}%</div>

            <div className="input-row">
              <input
                type="number"
                min={10}
                step={10}
                value={wagers[game.id] || 50}
                onChange={(e) => setWagers((prev) => ({ ...prev, [game.id]: Number(e.target.value) }))}
              />
            </div>

            <button className="primary-btn full" onClick={() => playGame(game.id)}>
              Play for ${wagers[game.id] || 50}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
