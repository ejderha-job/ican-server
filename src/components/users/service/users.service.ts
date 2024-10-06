import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AvatarDTO, chooseExecuterDTO, CreateUserDTO, UpdateUserDTO } from '../../../common/dto/users.dto';
import { resolve } from 'path';
import { writeFileSync } from 'fs';
import { hashSync } from 'bcrypt';
import { UserRepository } from '../repository/users.repository';
import { UserEntity } from 'src/typeorm/users.entity';
import { TasksService } from 'src/components/tasks/service/tasks.service';

@Injectable()
export class UsersService {
    constructor(private userRepository: UserRepository, @Inject(forwardRef(()=>TasksService)) private tasksService: TasksService) { }

    async findOne(login: string) {
        return await this.userRepository.getByLogin(login)
    }

    async findById(id: number): Promise<UserEntity> {
        return (await this.userRepository.getByID(id))[0]
    }

    async find() {
        return this.userRepository.getList()
    }

    async createUser({login, password}: CreateUserDTO) {
        const userAlredyExist = await this.findOne(login)
        if (userAlredyExist) {
            throw new HttpException("Пользователь с таким именем уже есть", HttpStatus.BAD_REQUEST)
        }
        const hash = hashSync(password, 6)
        return await this.userRepository.insert({ login: login, password: hash })
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

    async chooseExecuter({ExecuterID, MyID, TaskID}:chooseExecuterDTO){
        const task = await this.tasksService.findOne(TaskID)
        if (task.user.id !== MyID) {
            throw new HttpException("", HttpStatus.UNAUTHORIZED)
        }
        if (ExecuterID === MyID) {
            throw new HttpException("Вы не можете назначить себя исполнителем своей задачи", HttpStatus.BAD_REQUEST)
        }        
        const user = await this.userRepository.getByID(ExecuterID)[0] as UserEntity
        user.tasksWhereImExecuter.push(task)
        await this.userRepository.save(user)
        return "OK"
    }
}
