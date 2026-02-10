import { PrismaClient, User } from "../../generated/prisma/client";

export class UserRepository {
    constructor(
        private prisma: PrismaClient
    ){}

    async findAll(): Promise<User[]> {
        const users = await this.prisma.user.findMany();
        return users;
    }

    async paginate(page: number, perPage: number): Promise<User[]> {
        const users = await this.prisma.user.findMany({
            skip: (page - 1) * perPage,
            take: perPage,
        });
        return users;
    }

    async findById(id: number): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }
}