import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Users} from "./users.entity";
import {Repository} from "typeorm";
import { CreateUser } from 'src/dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(Users) private usersRepository: Repository<Users>) {
    }

    async findOne(login: string) {
        return await this.usersRepository.findOneBy({login})
    }

    async findById(id: number) {
        return await this.usersRepository.findOneBy({id})
    }

    async find() {
        return await this.usersRepository.find()
    }

    async createUser(user:CreateUser) {
        const userAlredyExist = await this.usersRepository.findOneBy({login:user.login})
        if (userAlredyExist) {
            return null
        }
        const newUser = new Users()
        newUser.login = user.login
        newUser.password = user.password
        newUser.tasks = []
        return this.usersRepository.save(newUser)
    }
}
