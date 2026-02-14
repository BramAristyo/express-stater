import { Prisma } from "../../generated/prisma/client";

export interface CreateUserDTO {
    email: string;
    password: string;
    name: string;
}

export interface UpdateUserDTO extends Partial<CreateUserDTO> {
    avatar?: string;
    role?: "USER" | "ADMIN";
}

export const userSelect = {
    id: true,
    email: true,
    name: true,
    avatar: true,
    role: true,
    createdAt: true,
    updatedAt: true,
}

export type UserResponse = Prisma.UserGetPayload<{
    select: typeof userSelect
}>;