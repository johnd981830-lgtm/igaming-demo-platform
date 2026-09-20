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

  useEffect(() => {
    fetch('http://localhost:3001/api/casino/games')
      .then((res) => res.json())
      .then(setGames)
      .catch(console.error);
  }, []);

  const playGame = async (gameId: string) => {
    const res = await fetch('http://localhost:3001/api/casino/play', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, gameId, wager: 50 }),
    });
    const data = await res.json();
    alert(`${data.result.toUpperCase()} — payout: $${data.payout}`);
  };

  return (
    <main style={{ padding: 32, background: '#0b1020', color: '#f8fafc', minHeight: '100vh' }}>
      <h1 style={{ fontSize: 42, marginBottom: 20 }}>Casino Lobby</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
        {games.map((game) => (
          <div key={game.id} style={{ background: '#111827', borderRadius: 18, padding: 20 }}>
            <div style={{ fontSize: 52 }}>{game.image}</div>
            <h3 style={{ margin: '10px 0' }}>{game.title}</h3>
            <div style={{ color: '#cbd5e1', marginBottom: 8 }}>{game.category}</div>
            <div style={{ color: '#cbd5e1', marginBottom: 8 }}>Volatility: {game.volatility}</div>
            <div style={{ color: '#86efac', marginBottom: 18 }}>RTP: {game.rtp}%</div>
            <button
              onClick={() => playGame(game.id)}
              style={{ background: '#8b5cf6', color: '#fff', border: 'none', borderRadius: 12, padding: '10px 18px', cursor: 'pointer' }}
            >
              Play for $50
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
