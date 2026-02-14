import { PrismaClient, User, Prisma } from "../../generated/prisma/client";
import { UserResponse, userSelect } from "./user.types";

export class UserRepository {
    constructor(
        private prisma: PrismaClient
    ){}

    async findAll(): Promise<UserResponse[]> {
        const users = await this.prisma.user.findMany({
            select: userSelect,
            orderBy: { id: 'desc' }
        });

        return users;
    }

    async paginate(page: number, perPage: number): Promise<UserResponse[]> {
        const users = await this.prisma.user.findMany({
            skip: (page - 1) * perPage,
            take: perPage,
            select: userSelect,
            orderBy: { id: 'desc' }
        });

        return users;
    }

    async findById(id: number): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({
            data
        });
    }

    async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
        return this.prisma.user.update({
            where: { id },
            data,
        });
    }

    async findByEmail(email: string): Promise<boolean> {
        const user =  await this.prisma.user.findUnique({
            where: { email },
        });
        
        return !!user;
    }

    async delete(id: number): Promise<User> {
        return this.prisma.user.delete({
            where: { id },
        });
    }
}