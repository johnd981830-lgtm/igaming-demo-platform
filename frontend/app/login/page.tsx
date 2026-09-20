'use client';

import { FormEvent, useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('user@demo.com');
  const [password, setPassword] = useState('demo123');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const res = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    alert(data.ok ? `Login success: ${data.user.username}` : data.message);
  };

  return (
    <main style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', background: '#0b1020', color: '#f8fafc' }}>
      <form onSubmit={handleSubmit} style={{ background: '#111827', padding: 28, borderRadius: 18, width: 360 }}>
        <h1 style={{ marginBottom: 20 }}>Login</h1>
        <label style={{ display: 'block', marginBottom: 10 }}>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, marginBottom: 16 }} />
        <label style={{ display: 'block', marginBottom: 10 }}>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, marginBottom: 16 }} />
        <button type="submit" style={{ width: '100%', padding: '12px 18px', borderRadius: 10, background: '#22c55e', color: '#04130d', border: 'none', fontWeight: 700 }}>Log in</button>
      </form>
    </main>
  );
}
