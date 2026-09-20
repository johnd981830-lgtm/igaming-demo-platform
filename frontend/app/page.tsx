'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="page-shell hero-shell">
      <nav className="topbar">
        <div className="brand">PrimeBet</div>
        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/sports">Sports</Link>
          <Link href="/casino">Casino</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/admin">Admin</Link>
          <Link href="/login">Login</Link>
        </div>
      </nav>

      <section className="hero-grid">
        <div>
          <p className="eyebrow">BET SMART. PLAY BIG.</p>
          <h1>Casino + sportsbook experience in one platform.</h1>
          <p className="subtitle">
            Explore a premium demo casino and betting platform with live matches, wallet management,
            instant casino actions, and admin intelligence.
          </p>

          <div className="cta-row">
            <Link href="/sports" className="primary-btn">Open Sportsbook</Link>
            <Link href="/casino" className="secondary-btn">Open Casino</Link>
          </div>

          <div className="stats-row">
            <div className="mini-stat"><strong>250K+</strong><span>Monthly turnover</span></div>
            <div className="mini-stat"><strong>120+</strong><span>Live markets</span></div>
            <div className="mini-stat"><strong>24/7</strong><span>Support desk</span></div>
          </div>
        </div>

        <div className="glass-card">
          <div className="balance-row">
            <span>Wallet balance</span>
            <span className="green">USD 2,500</span>
          </div>

          <div className="ticket-box">
            <div className="match-header">Premier League</div>
            <div className="match-teams">
              <span>Manchester City</span>
              <span className="vs">vs</span>
              <span>Arsenal</span>
            </div>
            <div className="odds-line">Home Win 1.90</div>
          </div>

          <div className="mini-boxes">
            <div><label>Live bets</label><strong>248</strong></div>
            <div><label>Casino play</label><strong>96%</strong></div>
          </div>
        </div>
      </section>
    </main>
  );
}
