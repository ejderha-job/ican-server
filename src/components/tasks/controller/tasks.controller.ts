import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCookieAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { TasksService } from '../service/tasks.service';
import { createTaskDTO } from 'src/common/dto/tasks.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {
    }

    @UseGuards(JwtAuthGuard)
    @ApiBody({ type: createTaskDTO })
    @ApiCookieAuth()
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
