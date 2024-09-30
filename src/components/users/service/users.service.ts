import { Injectable } from '@nestjs/common';
import { AvatarDTO, CreateUserDTO, UpdateUserDTO } from '../../../common/dto/users.dto';
import { resolve } from 'path';
import { writeFileSync } from 'fs';
import { hashSync } from 'bcrypt';
import { UserRepository } from '../repository/users.repository';

@Injectable()
export class UsersService {
    constructor(private userRepository: UserRepository) { }

    async findOne(login: string) {
        return await this.userRepository.getByLogin(login)
    }

    async findById(id: number) {
        return await this.userRepository.getByID(id)
    }

    async find() {
        return this.userRepository.getList()
    }

    async createUser(user: CreateUserDTO) {
        const userAlredyExist = await this.findOne(user.login)
        if (userAlredyExist) {
            return null
        }
        const hash = hashSync(user.password, 6)
        const newUser = await this.userRepository.insert({ login: user.login, password: hash })
        return newUser
    }

    async clear() {
        this.userRepository.clear()
    }

    async updateUser(user: UpdateUserDTO, userID: number) {
        await this.userRepository.update(userID, user)
        return await this.userRepository.getByID(userID)
    }

    async avatarUpload({ filename, file, userID }: AvatarDTO) {
        const pathName = resolve(__dirname, filename)
        await this.userRepository.update(userID, { avatar: pathName })
        writeFileSync(pathName, file)
        return pathName
    }
}
