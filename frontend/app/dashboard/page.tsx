'use client';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [ledger, setLedger] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState<number>(100);

  const loadData = async () => {
    const raw = localStorage.getItem('primebet-user');
    const user = raw ? JSON.parse(raw) : { id: 'user-1' };

    const profileRes = await fetch(`http://localhost:3001/api/auth/profile?userId=${user.id}`);
    const profileData = await profileRes.json();
    if (profileData.ok) {
      setProfile(profileData.user);
      const session = { ...user, ...profileData.user };
      localStorage.setItem('primebet-user', JSON.stringify(session));
    }

    const ledgerRes = await fetch(`http://localhost:3001/api/wallet/ledger?userId=${user.id}`);
    const ledgerData = await ledgerRes.json();
    setLedger(ledgerData);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateBalance = async (type: 'deposit' | 'withdraw') => {
    const raw = localStorage.getItem('primebet-user');
    const user = raw ? JSON.parse(raw) : { id: 'user-1' };

    const res = await fetch(`http://localhost:3001/api/wallet/${type}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, amount }),
    });

    const data = await res.json();
    if (data.ok) {
      setProfile((prev: any) => ({ ...prev, balance: data.balance }));
      const session = JSON.parse(localStorage.getItem('primebet-user') || '{}');
      session.balance = data.balance;
      localStorage.setItem('primebet-user', JSON.stringify(session));
      setLedger(data.ledger || ledger);
    } else {
      alert(data.message);
    }
  };

  if (loading) return <main className="page-shell"><div className="card-panel">Loading dashboard...</div></main>;

  return (
    <main className="page-shell">
      <div className="page-header-row">
        <h1>Player Dashboard</h1>
        <div className="pill-green">${profile?.balance ?? 0}</div>
      </div>

      <div className="stats-row compact">
        <div className="mini-stat"><strong>{profile?.username}</strong><span>Username</span></div>
        <div className="mini-stat"><strong>{profile?.role}</strong><span>Role</span></div>
        <div className="mini-stat"><strong>{ledger.length}</strong><span>Transactions</span></div>
      </div>

      <div className="card-panel wallet-panel">
        <h3>Wallet actions</h3>
        <div className="wallet-actions">
          <input type="number" min={10} step={10} value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
          <button className="primary-btn" onClick={() => updateBalance('deposit')}>Deposit</button>
          <button className="secondary-btn" onClick={() => updateBalance('withdraw')}>Withdraw</button>
        </div>
      </div>

      <section className="card-panel ledger-panel">
        <h3>Recent activity</h3>
        <div className="ledger-list">
          {ledger.map((entry) => (
            <div key={entry.id} className="ledger-row">
              <span>{entry.description}</span>
              <strong>{entry.type} ${entry.amount}</strong>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
