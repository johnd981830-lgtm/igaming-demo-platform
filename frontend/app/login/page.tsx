'use client';

import { FormEvent, useEffect, useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('user@demo.com');
  const [password, setPassword] = useState('demo123');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.ok) {
        const sessionUser = {
          id: data.user.id,
          email: data.user.email,
          username: data.user.username,
          role: data.user.role,
          balance: data.user.balance,
          token: data.token,
        };

        localStorage.setItem('primebet-user', JSON.stringify(sessionUser));
        window.location.href = '/dashboard';
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('Unable to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-shell">
      <form onSubmit={handleSubmit} className="auth-card">
        <h1>Welcome back</h1>
        <p>Sign in to access your wallet, bets, and casino activity.</p>

        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="submit" className="primary-btn full" disabled={loading}>
          {loading ? 'Signing in...' : 'Log in'}
        </button>

        <div className="demo-credentials">
          <small>Demo user: user@demo.com / demo123</small>
          <small>Demo admin: admin@demo.com / admin123</small>
        </div>
      </form>
    </main>
  );
}
