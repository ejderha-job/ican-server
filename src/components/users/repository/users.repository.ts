import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { log } from "console";
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
        return (await this.usersRepository.find({ where: { login }, relations: { tasks: true } }))[0]
    }

    async getByID(id: number) {
        return await this.usersRepository.find({ where: { id }, relations: { tasks: true } })
    }

    async getList() {
        return await this.usersRepository.find({ relations: { tasks: true } })
    }

    async insert(user:InsertUserDTO) {
        return (await this.usersRepository.insert(user)).raw[0].id
    }
}
