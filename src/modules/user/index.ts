import { Router } from 'express';
import { prisma } from '../../config/db';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserHandler } from './user.handler';

export const router = Router();

const repository = new UserRepository(prisma);
const service = new UserService(repository);
const handler = new UserHandler(service);

router.get('/all', handler.getAll);
router.get('/:id', handler.getById);
router.post('/', handler.create);
router.put('/:id', handler.update);
router.delete('/:id', handler.delete);
router.get('/', handler.getPaginated);


export default router;