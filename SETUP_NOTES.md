# Express TypeScript Starter - Installation Guide

## Prerequisites

- Node.js (v18+)
- Docker Desktop (for PostgreSQL)

---

## 1. Initialize Project

```bash
npm init -y
```

## 2. Install Dependencies

```bash
npm install express cors dotenv pg @prisma/client @prisma/adapter-pg prisma tsup
```

## 3. Install Dev Dependencies

```bash
npm install -D typescript @types/node @types/express @types/cors @types/pg ts-node tsx nodemon eslint prettier
```

## 4. Initialize TypeScript

```bash
npx tsc --init
```

## 5. Initialize Prisma

```bash
npx prisma init
```

## 6. Setup Database

```bash
docker-compose up -d
```

## 7. Generate Prisma Client

```bash
npx prisma generate
```

## 8. Run Migrations

```bash
npx prisma migrate dev --name init
```

## 9. Start Development Server

```bash
npm run dev
```

---

## Quick Reference

| Command                     | Description                      |
| --------------------------- | -------------------------------- |
| `npm run dev`               | Start dev server with hot reload |
| `npm run build`             | Build for production (tsup)      |
| `npm run start`             | Run production build             |
| `npm run format`            | Format code with Prettier        |
| `docker-compose up -d`      | Start PostgreSQL + Adminer       |
| `docker-compose down`       | Stop all containers              |
| `npx prisma generate`       | Generate Prisma Client           |
| `npx prisma migrate dev`    | Create new migration             |
| `npx prisma migrate deploy` | Deploy migrations to database    |
| `npx prisma studio`         | Open database UI                 |
| `npx prisma db push`        | Push schema without migration    |
