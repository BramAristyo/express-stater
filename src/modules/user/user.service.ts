import { UserRepository } from "./user.repository";

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
            throw new Error(`User with ID ${id} not found`);
        }

        return user;
    }
}