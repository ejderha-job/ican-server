import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { createTaskDTO, getTaskDTO, takeTaskDTO } from 'src/common/dto/tasks.dto';
import { SubcategoriesService } from 'src/components/subcategories/service/subcategories.service';
import { UsersService } from 'src/components/users/users.service';
import { TasksEntity } from 'src/typeorm/tasks.entity';
import { In, Repository } from "typeorm";

@Injectable()
export class TasksService {
    constructor(
        private subcategoriesService: SubcategoriesService,
        private usersService: UsersService,
        @InjectRepository(TasksEntity) private tasksRepository: Repository<TasksEntity>
    ) {
    }

    async getTasks(dto: getTaskDTO) {
        if (dto.subcategoriesIDs) {
            return await this.tasksRepository.find({ where: { id: In(dto.subcategoriesIDs) } })
        }
        return await this.tasksRepository.find()
    }


    async createTasks(task: createTaskDTO, userID: number) {
        const Subcategory = await this.subcategoriesService.findOne(task.categoryID)
        if (!Subcategory) throw new HttpException('Category not found', HttpStatus.BAD_REQUEST)
        const newTask = new TasksEntity()
        newTask.props = {
            name: task.task.name,
            price: task.task.price,
            description: task.task.description
        }
        newTask.Subcategory = Subcategory
        newTask.user = await this.usersService.findById(userID)
        return await this.tasksRepository.save(newTask)
    }

    async takeTask({ taskID, userID }: takeTaskDTO) {
        const task = await this.tasksRepository.findOneBy({ id: taskID })
        const user = await this.usersService.findById(userID)
        await this.tasksRepository.update(taskID, { ...task, executers: [...task.executers, user] })
        await this.usersService.updateUser({...user,    }, userID)
    }
}