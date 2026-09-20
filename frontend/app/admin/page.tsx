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
    <main style={{ padding: 32, background: '#0b1020', color: '#f8fafc', minHeight: '100vh' }}>
      <h1 style={{ fontSize: 42, marginBottom: 20 }}>Admin Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
        <StatCard label="Players" value={stats?.totalPlayers ?? 0} />
        <StatCard label="Total Balance" value={`$${stats?.totalBalance ?? 0}`} />
        <StatCard label="Active Bets" value={stats?.activeBets ?? 0} />
        <StatCard label="Games" value={stats?.totalGames ?? 0} />
      </div>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div style={{ background: '#111827', padding: 20, borderRadius: 16 }}>
      <div style={{ color: '#94a3b8' }}>{label}</div>
      <div style={{ fontSize: 32, marginTop: 10, fontWeight: 700 }}>{value}</div>
    </div>
  );
}
