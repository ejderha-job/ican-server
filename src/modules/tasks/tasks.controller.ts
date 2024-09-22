import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { TasksService } from "./tasks.service";
import { createTaskDTO } from "./dto/tasks.dto";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {
    }
    
    @UseGuards(JwtAuthGuard)
    @ApiBody({type:createTaskDTO})
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
