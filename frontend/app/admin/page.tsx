'use client';

import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [stats, setStats] = useState<any>(null);
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/admin/stats')
      .then((res) => res.json())
      .then(setStats)
      .catch(console.error);

    fetch('http://localhost:3001/api/admin/summary')
      .then((res) => res.json())
      .then(setSummary)
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

      <div className="card-panel" style={{ marginTop: 20 }}>
        <h3>Overview summary</h3>
        <div className="ledger-list">
          <div className="ledger-row"><span>Active players</span><strong>{summary?.overview?.activePlayers ?? 0}</strong></div>
          <div className="ledger-row"><span>Pending settlements</span><strong>{summary?.overview?.pendingSettlements ?? 0}</strong></div>
          <div className="ledger-row"><span>Transactions</span><strong>{summary?.overview?.transactions ?? 0}</strong></div>
          <div className="ledger-row"><span>Total revenue</span><strong>${summary?.overview?.totalRevenue ?? 0}</strong></div>
        </div>
      </div>

      <div className="card-panel" style={{ marginTop: 20 }}>
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
