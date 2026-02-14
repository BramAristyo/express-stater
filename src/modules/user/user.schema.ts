import { z } from "zod";

export const createUserSchema = z.object({
    body: z.object({
        email: z.email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters long"),
        name: z.string().min(2).trim(),
    }).strict()
});

export const updateUserSchema = z.object({
    body: z.object({
        email: z.email("Invalid email address").optional(),
        password: z.string().min(8, "Password must be at least 8 characters long").optional(),
        name: z.string().min(2).trim().optional(),
        avatar: z.string().optional(),
        role: z.enum(["USER", "ADMIN"]).optional(),
    }).strict()
});