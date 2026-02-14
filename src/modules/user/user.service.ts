import { AppError } from "../../middlewares/errorHandler.middleware";
import { UserRepository } from "./user.repository";
import { CreateUserDTO, UpdateUserDTO } from "./user.types";
import * as bcrypt from "bcrypt";

export class UserService {
    constructor(
        private userRepository: UserRepository
    ){}

    async getAll() {
        return this.userRepository.findAll();
    }

    async getPaginated(page: number, perPage: number) {
        return this.userRepository.paginate(page, perPage);
    }

    async getById(id: number) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new AppError(404, `User with ID ${id} not found`);
        }

        return user;
    }

    async create(data: CreateUserDTO){
        if (await this.userRepository.findByEmail(data.email)) {
            throw new AppError(409, "Email already in use");
        }

        const hashedPassword = await bcrypt.hash(data.password, 10); 

        return this.userRepository.create({
            email: data.email,
            name: data.name,
            password: hashedPassword,
            role: 'USER',
            avatar: 'default.png',
        });
    }

    async delete(id: number){
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new AppError(404, `User with ID ${id} not found`);
        }

        return this.userRepository.delete(id);
    }

    async update(id: number, data: UpdateUserDTO){
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new AppError(404, `User with ID ${id} not found`);
        }

        if (data.email && data.email !== user.email) {
            if (await this.userRepository.findByEmail(data.email)) {
                throw new AppError(409, "Email already in use");
            }
        }

        if (data.password && data.password !== user.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }

        return this.userRepository.update(id, {
            email: data.email,
            name: data.name,
            password: data.password,
            role: data.role,
            avatar: data.avatar,
        }) as UpdateUserDTO;
    }

}