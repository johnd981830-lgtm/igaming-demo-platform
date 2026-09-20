'use client';

import { useEffect, useMemo, useState } from 'react';
import { apiFetch } from '../../lib/api';
import { getStoredUser, saveStoredUser } from '../../lib/storage';

type Market = { label: string; odds: number };
type Match = {
  id: string;
  home: string;
  away: string;
  league: string;
  startAt: string;
  markets: Market[];
};
type SlipItem = { matchId: string; matchName: string; selection: string; odds: number };

const leagues = ['All', 'Premier League', 'La Liga', 'Champions League'];

export default function SportsPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [slip, setSlip] = useState<SlipItem[]>([]);
  const [stake, setStake] = useState(25);
  const [balance, setBalance] = useState(2500);
  const [userId, setUserId] = useState('user-1');
  const [league, setLeague] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const user = getStoredUser();
    setUserId(user.id || 'user-1');
    setBalance(user.balance || 2500);

    apiFetch<Match[]>('/sportsbook/matches')
      .then(setMatches)
      .catch(() => setNotice('Unable to load markets. Start the backend and try again.'))
      .finally(() => setLoading(false));
  }, []);

  const filteredMatches = useMemo(() => matches.filter((match) => {
    const matchesLeague = league === 'All' || match.league === league;
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || `${match.home} ${match.away} ${match.league}`.toLowerCase().includes(query);
    return matchesLeague && matchesSearch;
  }), [matches, league, search]);

  const totalOdds = slip.length ? slip.reduce((total, item) => total * item.odds, 1) : 0;
  const potentialReturn = stake * totalOdds;

  const chooseMarket = (match: Match, market: Market) => {
    setNotice('');
    setSlip((current) => {
      const withoutMatch = current.filter((item) => item.matchId !== match.id);
      const selected = current.find((item) => item.matchId === match.id && item.selection === market.label);
      return selected ? withoutMatch : [...withoutMatch, {
        matchId: match.id,
        matchName: `${match.home} vs ${match.away}`,
        selection: market.label,
        odds: market.odds,
      }];
    });
  };

  const placeBet = async () => {
    if (!slip.length) return setNotice('Select an odd to add it to your bet slip.');
    if (!Number.isFinite(stake) || stake <= 0) return setNotice('Enter a valid stake.');
    if (slip.length > 1) return setNotice('Demo mode supports one selection per bet. Remove extra selections or place them separately.');

    setPlacing(true);
    const selection = slip[0];
    try {
      const data = await apiFetch<any>('/sportsbook/bet', {
        method: 'POST',
        body: JSON.stringify({ userId, matchId: selection.matchId, selection: selection.selection, stake }),
      });

      if (!data.ok) return setNotice(data.message || 'Bet could not be placed.');
      setBalance(data.balance);
      saveStoredUser({ ...getStoredUser(), id: userId, balance: data.balance });
      setSlip([]);
      setNotice(`Bet confirmed: ${selection.selection} for $${stake.toFixed(2)}.`);
    } catch {
      setNotice('Unable to place bet. Check that the backend is running.');
    } finally {
      setPlacing(false);
    }
  };

  return (
    <main className="page-shell sports-shell">
      <section className="sports-hero">
        <div>
          <div className="eyebrow">PrimeBet Sportsbook</div>
          <h1>Find your edge.</h1>
          <p className="subtitle">Curated markets, clear pricing, and a fast demo bet slip built for confident decisions.</p>
        </div>
        <div className="sports-balance-card">
          <span>Available balance</span>
          <strong>${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong>
          <small>Demo wallet · USD</small>
        </div>
      </section>

      <section className="sports-toolbar card-panel">
        <div className="search-wrap">
          <span>⌕</span>
          <input aria-label="Search matches" placeholder="Search teams or leagues" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="league-tabs" role="tablist" aria-label="League filters">
          {leagues.map((item) => <button key={item} className={league === item ? 'league-tab selected' : 'league-tab'} onClick={() => setLeague(item)}>{item}</button>)}
        </div>
      </section>

      <div className="sports-layout">
        <section>
          <div className="section-heading"><div><span className="live-dot" />Featured markets</div><span className="muted-label">{filteredMatches.length} events</span></div>
          {notice && <div className="notice-bar">{notice}</div>}
          {loading ? <div className="card-panel empty-state">Loading markets...</div> : filteredMatches.length === 0 ? <div className="card-panel empty-state">No markets match your search.</div> : (
            <div className="market-list">
              {filteredMatches.map((match) => {
                const active = slip.find((item) => item.matchId === match.id);
                return <article key={match.id} className="market-card">
                  <div className="market-card-top">
                    <div><span className="league-label">{match.league}</span><h3>{match.home} <span className="versus">vs</span> {match.away}</h3></div>
                    <div className="event-time"><span>Starts</span>{new Date(match.startAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}<b>{new Date(match.startAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</b></div>
                  </div>
                  <div className="market-card-footer"><span className="market-title">Match result</span><div className="market-buttons">{match.markets.map((market) => <button key={market.label} className={active?.selection === market.label ? 'market-odd active' : 'market-odd'} onClick={() => chooseMarket(match, market)}><span>{market.label}</span><b>{market.odds.toFixed(2)}</b></button>)}</div></div>
                </article>;
              })}
            </div>
          )}
        </section>

        <aside className="bet-slip card-panel">
          <div className="slip-heading"><div><span className="slip-icon">✓</span><div><h2>Bet slip</h2><small>{slip.length} selection{slip.length === 1 ? '' : 's'}</small></div></div><button className="clear-btn" onClick={() => setSlip([])}>Clear</button></div>
          {slip.length === 0 ? <div className="slip-empty"><div className="slip-empty-icon">＋</div><strong>Your slip is empty</strong><span>Click any highlighted odd to add a selection.</span></div> : <div className="slip-selections">{slip.map((item) => <div className="slip-selection" key={item.matchId}><button onClick={() => setSlip(slip.filter((selected) => selected.matchId !== item.matchId))}>×</button><span>{item.matchName}</span><small>{item.selection} <b>{item.odds.toFixed(2)}</b></small></div>)}</div>}
          <div className="slip-summary"><div><span>Combined odds</span><b>{totalOdds ? totalOdds.toFixed(2) : '—'}</b></div><label>Stake<input type="number" min={1} step={5} value={stake} onChange={(e) => setStake(Number(e.target.value))} /></label><div><span>Potential return</span><strong>${potentialReturn ? potentialReturn.toFixed(2) : '0.00'}</strong></div></div>
          <button className="primary-btn full place-btn" disabled={placing || slip.length === 0} onClick={placeBet}>{placing ? 'Placing bet...' : 'Place demo bet'}</button>
          <small className="responsible-note">Demo environment only. No real-money wagering is enabled.</small>
        </aside>
      </div>
    </main>
  );
}
