import { logger } from '../../config/logging';
import { UserService } from './user.service';
import { Request, Response } from 'express';

export class UserHandler {

    constructor(
        private userService: UserService
    ){}

    getAll = async (req: any, res: any) => {
        try {
            const users = await this.userService.getAll();
            res.json(users);
        } catch (error) {
            logger.error(`Error fetching users: ${(error as Error).message}`);
            res.status(500).json({ error: (error as Error).message });
        }
    }

    getPaginated = async (req: Request, res: Response) => {
        const page = parseInt(req.query.page as string) || 1;
        const perPage = parseInt(req.query.perPage as string) || 10;

        const users = await this.userService.getPaginated(page, perPage);
        res.json(users);
    }

    getById = async (req: Request, res: Response) => {
        const id = parseInt(String(req.params.id));
        try {
            const user = await this.userService.getById(id);
            res.json(user);
        } catch (error) {
            logger.error(`Error fetching user by ID: ${(error as Error).message}`);
            res.status(500).json({ error: (error as Error).message });
        }
    }
}