
import { Router } from 'express';
import { router as utilityRouter } from './utility';

export const router = Router();

router.use('/utility', utilityRouter);