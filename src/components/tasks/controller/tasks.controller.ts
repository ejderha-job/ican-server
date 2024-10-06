import { Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCookieAuth, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { TasksService } from '../service/tasks.service';
import { createTaskDTO } from 'src/common/dto/tasks.dto';
import { Request } from 'express';
import { IsAuth } from 'src/guard/isAuth';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {
    }

    @UseGuards(IsAuth)
    @ApiBody({ type: createTaskDTO })
    @ApiCookieAuth()
    @ApiOperation({ summary: "create task" })
    @Post('create')
    async createTasks(@Body() task: createTaskDTO, @Req() req: Request) {
        if (!Boolean(req.headers.authorization)) {
            throw new HttpException("unuftorizated", HttpStatus.UNAUTHORIZED)   
        }
        // @ts-ignore
        return this.tasksService.createTasks(task, req.userID)
    }

    @ApiOperation({ summary: "tasks list" })
    @Get()
    async getTasks(@Query() params) {
        if (params.IDs) {
            const subcategoriesIDs = params.IDs.split(',')
            return this.tasksService.getTasks({ subcategoriesIDs })
        }
        return this.tasksService.getTasks({})
    }

    @Post("take")
    @UseGuards(IsAuth)
    @ApiOperation({ summary: "take task" })
    @ApiQuery({name:"taskID"})
    async takeTask(@Req() req:Request) {
        // @ts-ignore
        await this.tasksService.takeTask({ taskID: req.query.taskID, userID: req.userID })
    }

    @Delete()   
    async DeleteTasks(){
        this.tasksService.removeAll()
    }

    @Get("my")
    @UseGuards(IsAuth)
    async getMyTasks(@Req() req:Request) {
        // @ts-ignore
        return await this.tasksService.getTasks({}, req.userID)
    }
}