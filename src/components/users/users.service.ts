import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUser } from 'src/dto';
import { AvatarDTO, EditUser } from '../../common/dto/users.dto';
import { resolve } from 'path';
import { writeFileSync } from 'fs';
import { UserEntity } from 'src/typeorm/users.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>) {
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
        const newUser = new UserEntity()
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

    async updateUser(user: EditUser, userID: number) {
        await this.usersRepository.update(userID, user)
        return await this.usersRepository.findOneBy({ id: userID })
    }

    async avatarUpload({ filename, file, userID }: AvatarDTO) {
        const pathName = resolve(__dirname, filename)
        await this.usersRepository.update(userID, { avatar: pathName })
        writeFileSync(pathName, file)
        return pathName
    }
}
