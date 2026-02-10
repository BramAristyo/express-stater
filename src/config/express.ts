import express from 'express';
import cors from 'cors';

const createServer = (): express.Application => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(express.json());

  app.disable('x-powered-by');

  app.get('/ping', (req, res) => {
    res.send('pong');
  });

  return app;
};

export { createServer };
