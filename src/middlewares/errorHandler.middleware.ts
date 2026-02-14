import { NextFunction, Request, Response } from "express";
import { ZodError, z } from "zod";
import { errorResponse } from "../utils/response.utils";
import { Prisma } from "../generated/prisma/client";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { logger } from "../config/logging";

export class AppError extends Error {
    constructor(
        public code: number,
        public message: string,
        public isOperational: boolean = true
    ) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof ZodError) {
        return errorResponse(
            res,
            "Validation Error",
            400,
            error.issues.map((err) => ({
                field: err.path.join('.'),
                message: err.message
            }))
        );
    }

    if (error instanceof AppError) {
        logger.error(`App Error: ${error.message}`);

        if (error.code === 403 || error.code === 401) {
            logger.warn(`Security Warning: ${error.message}`, {
                ip: req.ip,
                path: req.originalUrl,
            });
        }

        if (error.isOperational) {
            return errorResponse(res, error.message, error.code);
        }
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError){
        if (error.code === 'P2002') {
            logger.error(`Unique Constraint Failed: ${error.message}`);
            return errorResponse(res, "Unique constraint failed", 409);
        }
    }

    if ( error instanceof JsonWebTokenError) {
        return errorResponse(res, "Invalid token", 401);
    }

    if ( error instanceof TokenExpiredError) {
        return errorResponse(res, "Token has expired", 401);
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
        return errorResponse(res, "Database Validation Error", 400);
    }

    logger.error('Unhandled Error Occurred 💥', {
        message: error.message,
        stack: error.stack,
        path: req.originalUrl,
        method: req.method,
        body: req.body,
        ip: req.ip,
        user_id: (req as any).user?.id || null,
    });

    return errorResponse(res, "Internal Server Error, call support. ASAP", 500);
}