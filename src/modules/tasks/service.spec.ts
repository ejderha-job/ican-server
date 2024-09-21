import { Test } from "@nestjs/testing"
import { TasksController } from "./tasks.controller"
import { TasksService } from "./tasks.service"
import { getRepositoryToken } from "@nestjs/typeorm"
import { Tasks } from "./entity/tasks.entity"
import { SubcategoriesService } from "../subcategories/subcategories.service"
import { UsersService } from "../users/users.service"
import { Users } from "../users/entity/users.entity"
import { Subcategories } from "../subcategories/entity/subcategories.entity"

const taskRepository = {
    update: jest.fn(),
    findOneBy: jest.fn(),
}

const usersServiceMock = {
    updateUser: jest.fn(),
    findById: jest.fn(),
}

const mockedUser = {
    "fio": "ksm",
    "avatar": "path-to-avatar",
    "id": 213,
    "login": "my-awasome-login",
    "password": "pass",
    "tasks": [],
    "tasksWhereImExecuter": []
}

const anotherUser = new Users()
const subcategory = new Subcategories()

const mockedTask = {
    id: 1,
    user: anotherUser,
    Subcategory: subcategory,
    props: {},
    executers: []
}

describe("Тест взятия задачи в работу", () => {
    let service: TasksService

    beforeEach(async () => {
        const subcategoriesService = { provide: SubcategoriesService, useValue: {} }
        const usersService = { provide: UsersService, useValue: usersServiceMock }

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

    it("Юзер добавится в список исполнителей, таска должна добавится в список взятых в паботу у юзера", async () => {
        const res = await service.takeTask(213, 1)
        
        usersServiceMock.findById.mockReturnValue(mockedUser)
        taskRepository.findOneBy.mockReturnValue(mockedTask)

        expect(usersServiceMock.findById).toHaveBeenCalledWith(213)
        expect(taskRepository.findOneBy).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }))

        expect(taskRepository.update).toHaveBeenCalled()
        expect(taskRepository.update).toHaveBeenCalledWith(1, mockedTask)
        expect(usersServiceMock.updateUser).toHaveBeenCalled()
        expect(usersServiceMock.updateUser).toHaveBeenCalledWith(mockedUser, 213)

        expect(res.id).toBe(1)
        expect(res.executers).toHaveLength(1)
    })
})