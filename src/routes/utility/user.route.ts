import { Router } from 'express';

export const router = Router();

router.use('/', (req, res) => {
  res.json({ message: 'User route is working!' });
});