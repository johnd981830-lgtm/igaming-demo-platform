'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ fontFamily: 'Arial, sans-serif', padding: 32, background: '#0b1020', color: '#f5f7ff', minHeight: '100vh' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', gap: 16, paddingBottom: 32, borderBottom: '1px solid #1f2b4a' }}>
        <div style={{ fontSize: 28, fontWeight: 700 }}>PrimeBet</div>
        <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
          <Link href="/">Home</Link>
          <Link href="/sports">Sports</Link>
          <Link href="/casino">Casino</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/admin">Admin</Link>
          <Link href="/login">Login</Link>
        </div>
      </nav>

      <section style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 32, alignItems: 'center', paddingTop: 56 }}>
        <div>
          <p style={{ color: '#7dd3fc', fontWeight: 700, letterSpacing: 1 }}>BET SMART. PLAY BIG.</p>
          <h1 style={{ fontSize: 56, margin: '12px 0', lineHeight: 1.1 }}>Casino + sportsbook experience in one platform.</h1>
          <p style={{ color: '#cbd5e1', fontSize: 20, maxWidth: 640 }}>
            Explore a clean, demo-ready gambling platform with live betting, in-game wallets, casino lobby, and admin insights.
          </p>
          <div style={{ display: 'flex', gap: 16, marginTop: 28 }}>
            <Link href="/sports" style={{ background: '#22c55e', color: '#04130d', padding: '14px 22px', borderRadius: 12, fontWeight: 700, textDecoration: 'none' }}>Open Sportsbook</Link>
            <Link href="/casino" style={{ background: '#1d4ed8', color: '#fff', padding: '14px 22px', borderRadius: 12, fontWeight: 700, textDecoration: 'none' }}>Open Casino</Link>
          </div>
        </div>

        <div style={{ background: 'linear-gradient(145deg, #111827, #1e293b)', borderRadius: 24, padding: 28, boxShadow: '0 12px 30px rgba(0,0,0,0.35)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
            <span>Bal</span>
            <span style={{ color: '#86efac' }}>USD 2,500</span>
          </div>
          <div style={{ marginTop: 28, padding: 18, background: '#0f172a', borderRadius: 16 }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>Premier League</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
              <span>Manchester City</span>
              <span>vs</span>
              <span>Arsenal</span>
            </div>
            <div style={{ marginTop: 14, color: '#fbbf24', fontWeight: 700 }}>Home Win 1.90</div>
          </div>
        </div>
      </section>
    </main>
  );
}
