'use client';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [ledger, setLedger] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/auth/profile?userId=user-1')
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) setProfile(data.user);
      });

    fetch('http://localhost:3001/api/wallet/ledger?userId=user-1')
      .then((res) => res.json())
      .then(setLedger)
      .catch(console.error);
  }, []);

  return (
    <main style={{ padding: 32, background: '#0b1020', color: '#f8fafc', minHeight: '100vh' }}>
      <h1 style={{ fontSize: 42, marginBottom: 20 }}>Player Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20 }}>
        <div style={{ background: '#111827', borderRadius: 16, padding: 20 }}>
          <div style={{ color: '#94a3b8' }}>Username</div>
          <div style={{ fontSize: 24, marginTop: 8 }}>{profile?.username || 'Loading...'}</div>
        </div>
        <div style={{ background: '#111827', borderRadius: 16, padding: 20 }}>
          <div style={{ color: '#94a3b8' }}>Balance</div>
          <div style={{ fontSize: 24, marginTop: 8 }}>${profile?.balance || 0}</div>
        </div>
        <div style={{ background: '#111827', borderRadius: 16, padding: 20 }}>
          <div style={{ color: '#94a3b8' }}>Role</div>
          <div style={{ fontSize: 24, marginTop: 8 }}>{profile?.role || 'Loading...'}</div>
        </div>
      </div>

      <section style={{ marginTop: 30 }}>
        <h2>Wallet Ledger</h2>
        <div style={{ background: '#111827', padding: 16, borderRadius: 16 }}>
          {ledger.map((entry) => (
            <div key={entry.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #1f2937' }}>
              <span>{entry.description}</span>
              <span>{entry.type} ${entry.amount}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
