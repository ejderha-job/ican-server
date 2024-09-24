import { Test } from "@nestjs/testing"
import { getRepositoryToken } from "@nestjs/typeorm"
import { UsersService } from "../../users/users.service"
import { TasksService } from "./tasks.service"
import { SubcategoriesService } from "src/components/subcategories/service/subcategories.service"
import { TasksController } from "../controller/tasks.controller"
import { TasksEntity } from "src/typeorm/tasks.entity"

const taskRepository = {
}

describe("Тест взятия задачи в работу", () => {
    let service: TasksService

    beforeEach(async () => {
        const subcategoriesService = { provide: SubcategoriesService, useValue: {} }
        const usersService = { provide: UsersService, useValue: {} }

        const tasksModule = await Test.createTestingModule({
            controllers: [TasksController],
            providers: [
                TasksService,
                { provide: getRepositoryToken(TasksEntity), useValue: taskRepository },
                subcategoriesService,
                usersService
            ]
        }).compile()

        service = tasksModule.get(TasksService)
    })

    it("", async () => {
    })
})