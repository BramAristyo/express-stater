import { prisma } from "../src/config/db";
import { Role } from "../src/generated/prisma/enums";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

async function seedFakeData() {
    console.log("Seeding fake data...");
    for (let i = 0; i < 100; i++) {
        const password = await bcrypt.hash("password", 10);

        await prisma.user.create({
            data: {
                email: faker.internet.email(),
                name: faker.person.fullName(),
                password: password,
                role: Role.USER,
                avatar: faker.image.avatar()
            }
        });
    }
    
}

async function main() {
    const password = await bcrypt.hash("password", 10);

    const admin = await prisma.user.upsert({
        where: { email: "admin@example.com" },
        update: {},
        create: {
            email: "admin@example.com",
            name: "Admin User",
            password: password,
            role: Role.ADMIN,
            avatar: "https://www.shutterstock.com/id/search/jesus-christ-images"
        }
    });

    console.log("Admin user created:", admin);

    
    await seedFakeData();
}

main()
    .then(async () => {
        await prisma.$disconnect();
        process.exit(0);
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
