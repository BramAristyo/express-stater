import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { logger } from "./logging";

const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const logConfig = process.env.NODE_ENV === 'development'
  ? [
      { emit: 'event', level: 'query' },
      { emit: 'event', level: 'error' },
      { emit: 'event', level: 'info' },
      { emit: 'event', level: 'warn' },
    ]
  : [
      { emit: 'event', level: 'error' },
    ];

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: logConfig as any,
});

const SLOW_QUERY_THRESHOLD_MS = 2000;

prisma.$on('query' as never, (e: any) => {
  const duration = e.duration;

  if (duration > SLOW_QUERY_THRESHOLD_MS) {
    logger.warn(`Slow Query (${duration}ms): ${e.query}`, {
      params: e.params,
      duration: `${e.duration}ms`
    });
  } else {
    logger.debug(`Query: ${e.query}`, {
      params: e.params,
      duration: `${e.duration}ms`
    });
  }

});

prisma.$on('info' as never, (e: any) => {
  logger.info(`Prisma Info: ${e.message}`);
});

prisma.$on('warn' as never, (e: any) => {
  logger.warn(`Prisma Warn: ${e.message}`);
});

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export const cleanup = async () => {
  try {
    await prisma.$disconnect();
    await pool.end();

    logger.info("Database connections closed successfully.");
  } catch (error) {
    logger.error("Error during database disconnection:", error);
  }
};

process.on("beforeExit", cleanup);
process.on("exit", cleanup);