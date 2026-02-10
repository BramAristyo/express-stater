import { Router } from 'express';
import { prisma } from '../../config/db';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserHandler } from './user.handler';

export const router = Router();

const repository = new UserRepository(prisma);
const service = new UserService(repository);
const handler = new UserHandler(service);

router.use('/all', handler.getAll);
router.use('/:id', handler.getById);
router.use('/', handler.getPaginated);

export default router;