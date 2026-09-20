# iGaming Demo Platform

A working demo MVP for a casino + sportsbook platform built with:

- Next.js frontend
- NestJS backend
- PostgreSQL-ready structure
- Demo wallet, auth, sportsbook, casino, and admin APIs

This project is a prototype for learning and product validation. It is not a licensed real-money gambling product.

## Stack

- Frontend: Next.js + React + TypeScript + Tailwind CSS
- Backend: NestJS + TypeScript
- Data layer: mock in-memory store for rapid MVP testing
- Runtime: Docker Compose for local services

## Local setup

1. Install dependencies:

```bash
npm install
npm run install:all
```

2. Start services:

```bash
npm run dev
```

3. Open the app:

- Frontend: http://localhost:3000
- Backend: http://localhost:3001/api

## Demo accounts

- User: `user@demo.com` / `demo123`
- Admin: `admin@demo.com` / `admin123`

## Included features

- Email/password authentication flow
- User wallet and ledger system
- Sportsbook matches and bet placement
- Casino lobby and gameplay simulation
- Admin summary dashboard
- Dockerized local infrastructure

## Production note

Real gambling products require:

- licensing and compliance
- age verification and geolocation
- KYC / AML
- secure payment providers
- liability / fraud controls
- game provider contracts
- real database + cache + audit trails

## Repository

https://github.com/johnd981830-lgtm/igaming-demo-platform
