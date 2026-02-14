import { logger } from '../../config/logging';
import { errorResponse, successResponse } from '../../utils/response.utils';
import { createUserSchema, updateUserSchema } from './user.schema';
import { UserService } from './user.service';
import { NextFunction, Request, Response } from 'express';

export class UserHandler {

    constructor(
        private userService: UserService
    ){}

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await this.userService.getAll();
            return res.json(users);
        } catch (error) {
            next(error);
        }
    }

    getPaginated = async (req: Request, res: Response, next: NextFunction) => {
        const page = parseInt(req.query.page as string) || 1;
        const perPage = parseInt(req.query.perPage as string) || 10;

        try {
            const users = await this.userService.getPaginated(page, perPage);
            return res.json(users);
        } catch (error) {
            next(error);
        }
    }

    getById = async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(String(req.params.id));
        try {
            const user = await this.userService.getById(id);
            return successResponse(res, user, "User fetched successfully");
        } catch (error) {
            next(error);
        }
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        const validated = createUserSchema.parse(req);
        try {
            const newUser = await this.userService.create(validated.body);
            return successResponse(res, newUser, "User created successfully", 201);
        } catch (error) {
            next(error);
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const validated = updateUserSchema.parse(req);
            const id = parseInt(String(req.params.id));
            const updatedUser = await this.userService.update(id, validated.body);
            return successResponse(res, updatedUser, "User updated successfully");
        } catch (error) {
            next(error);
        }
    }

    delete = async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(String(req.params.id));
        try {
            const deletedUser = await this.userService.delete(id);
            return successResponse(res, deletedUser, "User deleted successfully");
        } catch (error) {
            next(error);
        }
    }
}