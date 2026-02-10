# Express TypeScript API

Simple REST API with Express, TypeScript, and PostgreSQL.

## Setup

### 1. Install Dependencies
```bash
npm install
```

Installed packages:
- `express` - Web framework
- `typescript` - Type safety
- `ts-node` - Run TypeScript directly (development)
- `nodemon` - Auto-restart server on file changes
- `@prisma/client` - Database ORM
- `@prisma/adapter-pg` - PostgreSQL adapter for Prisma
- `pg` - PostgreSQL driver
- `dotenv` - Environment variables
- `prettier` - Code formatter

### 2. Setup Database
```bash
# Start PostgreSQL with Docker
docker-compose up -d

# Generate Prisma Client
npx prisma generate
```

### 3. Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 4. Run Development Server
```bash
npm run dev
```

Server will run at `http://127.0.0.1:3000`

## Commands

- `npm run dev` - Start development server with hot reload
- `npm run format` - Format code with Prettier
- `npx prisma studio` - Open Prisma Studio (Database UI)

## Technology Stack

- **Express** - Web framework
- **TypeScript** - Type safety
- **PostgreSQL** - Database
- **Prisma** - ORM
- **Docker** - Containerization
- **Nodemon** - Auto-restart development server
- **Prettier** - Code formatter