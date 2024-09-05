import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { TasksService } from "./tasks.service";
import { JwtAuthGuard } from "../guard/jwt-auth.guard";
import { createTaskDTO } from "./dto/tasks.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {
    }
    @UseGuards(JwtAuthGuard)
    @Post()
    async createTasks(@Body() task: createTaskDTO, @Req() req) {
        return this.tasksService.createTasks(task, req.user.id)
    }
    @Get()
    async getTasks(@Query() params) {
        if (params.IDs) {
            const subcategoriesIDs = params.IDs.split(',')
            return this.tasksService.getTasks({ subcategoriesIDs })
        }
        return this.tasksService.getTasks({})
    }
}
