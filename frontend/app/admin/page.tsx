'use client';

import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/admin/stats')
      .then((res) => res.json())
      .then(setStats)
      .catch(console.error);
  }, []);

  return (
    <main className="page-shell">
      <div className="page-header-row">
        <h1>Admin Dashboard</h1>
        <div className="pill-green">Operations live</div>
      </div>

      <div className="stats-row admin-grid">
        <div className="mini-stat"><strong>{stats?.totalPlayers ?? 0}</strong><span>Players</span></div>
        <div className="mini-stat"><strong>${stats?.totalBalance ?? 0}</strong><span>Wallet value</span></div>
        <div className="mini-stat"><strong>{stats?.activeBets ?? 0}</strong><span>Open bets</span></div>
        <div className="mini-stat"><strong>{stats?.totalGames ?? 0}</strong><span>Games</span></div>
      </div>

      <div className="card-panel">
        <h3>Recent bet activity</h3>
        <div className="ledger-list">
          {(stats?.recentActivity ?? []).map((entry: any) => (
            <div key={entry.id} className="ledger-row">
              <span>{entry.selection}</span>
              <strong>{entry.status} ${entry.stake}</strong>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
