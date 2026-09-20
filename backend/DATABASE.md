# Database-backed MVP setup

The backend now persists users, wallet ledger entries, matches, markets, games, and the core betting entities in PostgreSQL through Prisma.

```bash
cd backend
cp .env.example .env
npm install
npm run db:setup
npm run start:dev
```

Or start PostgreSQL first from the repository root:

```bash
docker compose up -d postgres
```

The seed creates:

- `user@demo.com` / `demo123`
- `admin@demo.com` / `admin123`
- demo sportsbook matches and markets
- demo casino games

The existing in-memory sportsbook/casino services are still present for the UI compatibility pass; the authentication and wallet paths now use PostgreSQL transactions. The next migration step should move sportsbook, casino, and admin reads/writes fully onto Prisma as well.
