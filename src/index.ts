import * as dotenv from 'dotenv';
import { createServer } from './config/express';
import { prisma } from './config/db';
import http from 'http';
import { AddressInfo } from 'net';
dotenv.config();

const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || '3000';

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
    
  const app = await createServer();
  const server = http.createServer(app).listen({ host, port }, () => {
    const addressInfo = server.address() as AddressInfo;
    console.log(
      `Server running at http://${addressInfo.address}:${addressInfo.port}`,
    );
  });

  const signalTraps: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
  signalTraps.forEach((type) => {
    process.once(type, async () => {
      console.log(`Received ${type}, closing server...`);
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    });
  });
};

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
