# Database-backed sportsbook and casino

The sportsbook, casino, and admin services now read and write through Prisma/PostgreSQL. The in-memory mock collections are no longer used by these flows.

```bash
cd backend
cp .env.example .env
npm install
npm run db:setup
npm run start:dev
```

The seed uses future event dates so demo betting remains available. This is still demo logic: real-money payments, regulated settlement, KYC/AML, age verification, and provider integrations are not included.
