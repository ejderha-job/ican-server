import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./entity/users.entity";
import { Repository } from "typeorm";
import { CreateUser } from 'src/dto';
import { EditUser } from './dto/dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(Users) private usersRepository: Repository<Users>) {
    }

    async findOne(login: string) {
        return await this.usersRepository.findOneBy({ login })
    }

    async findById(id: number) {
        return await this.usersRepository.findOneBy({ id })
    }

    async find() {
        return await this.usersRepository.find({ relations: { tasks: true } })
    }

    async createUser(user: CreateUser) {
        const userAlredyExist = await this.usersRepository.findOneBy({ login: user.login })
        if (userAlredyExist) {
            return null
        }
        const newUser = new Users()
        newUser.login = user.login
        newUser.password = user.password
        newUser.tasks = []
        return this.usersRepository.save(newUser)
    }

    async clear() {
        this.usersRepository
            .createQueryBuilder()
            .delete()
            .execute()
    }

    async updateUser(user:EditUser, userID:number) {
        await this.usersRepository.update(userID, user)
        return await this.usersRepository.findOneBy({id:userID})
    }
}
