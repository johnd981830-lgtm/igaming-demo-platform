# iGaming Demo Platform

A working demo MVP for a casino + sportsbook platform built with:

- Next.js frontend
- NestJS backend
- PostgreSQL-ready structure
- Demo wallet, auth, sportsbook, casino, and admin APIs

This is a demo/prototype for learning and product validation. It is not a licensed real-money gambling product.

## Stack

- Frontend: Next.js + React + TypeScript + Tailwind CSS
- Backend: NestJS + TypeScript
- Data layer: in-memory mock store for rapid MVP demo
- Runtime: Docker Compose

## Quick start

### 1) Start backend

```bash
cd backend
npm install
npm run start:dev
```

API will run on `http://localhost:3001`

### 2) Start frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:3000`

### 3) Open the app

- Home: http://localhost:3000
- Login: http://localhost:3000/login
- Dashboard: http://localhost:3000/dashboard
- Sports: http://localhost:3000/sports
- Casino: http://localhost:3000/casino
- Admin: http://localhost:3000/admin

## Demo credentials

- User: `user@demo.com` / `demo123`
- Admin: `admin@demo.com` / `admin123`

## Included features

- Authentication
- User wallet and ledger
- Sportsbook match list and bet placement
- Casino game lobby and gameplay simulation
- Admin dashboard stats
- CORS-ready API

## Notes

For a production gambling platform, you will need:

- licensing and compliance
- KYC/AML workflows
- geolocation and age verification
- secure payment providers
- sportsbook/casino provider APIs
- real database and caching layer
- monitoring and fraud controls

## Repository

https://github.com/johnd981830-lgtm/igaming-demo-platform
