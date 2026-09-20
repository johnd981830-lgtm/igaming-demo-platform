'use client';

import { useEffect, useMemo, useState } from 'react';
import { apiFetch } from '../../lib/api';
import { getStoredUser, saveStoredUser } from '../../lib/storage';

type Game = {
  id: string;
  title: string;
  category: string;
  volatility: 'Low' | 'Medium' | 'High';
  rtp: number;
  provider: string;
  image: string;
};

export default function CasinoPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [userId, setUserId] = useState('user-1');
  const [balance, setBalance] = useState(2500);
  const [wagers, setWagers] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'Slots' | 'Table' | 'Instant'>('All');

  useEffect(() => {
    const user = getStoredUser();
    setUserId(user.id || 'user-1');
    setBalance(user.balance || 2500);

    apiFetch<Game[]>('/casino/games')
      .then(setGames)
      .catch(() => setNotice('Unable to load the casino lobby. Start the backend and try again.'))
      .finally(() => setLoading(false));
  }, []);

  const filteredGames = useMemo(() => {
    return activeTab === 'All' ? games : games.filter((game) => game.category === activeTab);
  }, [games, activeTab]);

  const playGame = async (gameId: string) => {
    const wager = wagers[gameId] || 50;
    if (!Number.isFinite(wager) || wager <= 0) {
      setNotice('Choose a valid wager amount.');
      return;
    }

    try {
      const data = await apiFetch<any>('/casino/play', {
        method: 'POST',
        body: JSON.stringify({ userId, gameId, wager }),
      });

      if (!data.ok) {
        setNotice(data.message || 'Game could not be played.');
        return;
      }

      setBalance(data.balance);
      saveStoredUser({ ...getStoredUser(), id: userId, balance: data.balance });
      setNotice(`${data.result.toUpperCase()} · payout $${data.payout} · balance $${data.balance}`);
    } catch {
      setNotice('Unable to play the game. Check the backend connection.');
    }
  };

  return (
    <main className="page-shell casino-shell">
      <section className="casino-hero">
        <div>
          <div className="eyebrow">PrimeBet Casino</div>
          <h1>Instant thrills, premium tables.</h1>
          <p className="subtitle">A polished casino lobby with curated categories, transparent RTP, and frictionless demo gameplay.</p>
        </div>
        <div className="casino-balance-card">
          <span>Wallet</span>
          <strong>${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong>
          <small>Available balance</small>
        </div>
      </section>

      <section className="casino-toolbar card-panel">
        <div className="casino-tabs">
          {(['All', 'Slots', 'Table', 'Instant'] as const).map((tab) => (
            <button key={tab} className={activeTab === tab ? 'casino-tab selected' : 'casino-tab'} onClick={() => setActiveTab(tab)}>{tab}</button>
          ))}
        </div>
      </section>

      {notice && <div className="notice-bar">{notice}</div>}

      {loading ? <div className="card-panel empty-state">Loading casino games...</div> : (
        <section className="game-grid">
          {filteredGames.map((game) => (
            <article key={game.id} className="game-card card-panel">
              <div className="game-card-header">
                <div className="game-icon">{game.image}</div>
                <span className="game-badge">{game.category}</span>
              </div>

              <div className="game-card-body">
                <h3>{game.title}</h3>
                <div className="game-meta-row"><span>Provider</span><strong>{game.provider}</strong></div>
                <div className="game-meta-row"><span>Volatility</span><strong>{game.volatility}</strong></div>
                <div className="game-meta-row green-row"><span>RTP</span><strong>{game.rtp}%</strong></div>
              </div>

              <div className="game-controls">
                <label>Wager</label>
                <input type="number" min={10} step={10} value={wagers[game.id] || 50} onChange={(e) => setWagers((prev) => ({ ...prev, [game.id]: Number(e.target.value) }))} />
                <button className="primary-btn full" onClick={() => playGame(game.id)}>Play for ${wagers[game.id] || 50}</button>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
