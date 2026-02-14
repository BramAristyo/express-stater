import express from 'express';
import cors from 'cors';
import { prisma } from './db';
import userModule from '../modules/user';
import { errorHandler } from '../middlewares/errorHandler.middleware';

const createServer = (): express.Application => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(express.json());
  app.disable('x-powered-by');
  
  app.use('/api/users', userModule);
    
  app.get('/health', async (req, res) => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      res.json({ status: 200, database: 'connected' });
    } catch (err) {
      res.status(503).json({ status: 503, data: err });
    }
  });
  
  app.use(errorHandler);
  return app;
};

export { createServer };
