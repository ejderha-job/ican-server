import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertUserDTO, UpdateUserDTO } from "src/common/dto/users.dto";
import { UserEntity } from "src/typeorm/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository {
    constructor(@InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>) {
    }

    async update(userID: number, user: UpdateUserDTO) {
        await this.usersRepository.update(userID, user)
    }

    async clear() {
        await this.usersRepository.delete({})
    }

    async getByLogin(login: string) {
        return await this.usersRepository.find({ where: { login }, relations: { tasks: true } })
    }

    async getByID(id: number) {
        return await this.usersRepository.find({ where: { id }, relations: { tasks: true } })
    }

    async getList() {
        return await this.usersRepository.find({ relations: { tasks: true } })
    }

    async insert(user:InsertUserDTO) {
        await this.usersRepository.insert(user)
    }
}
