import { Test } from "@nestjs/testing"
import { TasksController } from "./tasks.controller"
import { TasksService } from "./tasks.service"
import { getRepositoryToken } from "@nestjs/typeorm"
import { Tasks } from "./entity/tasks.entity"
import { SubcategoriesService } from "../subcategories/subcategories.service"
import { UsersService } from "../users/users.service"

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
                { provide: getRepositoryToken(Tasks), useValue: taskRepository },
                subcategoriesService,
                usersService
            ]
        }).compile()

        service = tasksModule.get(TasksService)
    })

    it("", async () => {
    })
})