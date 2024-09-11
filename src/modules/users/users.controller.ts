import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { UsersService } from "./users.service";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserDTO } from './dto/dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    async users() {
        return await this.usersService.find()
    }

    @Delete()
    async delete() {
        return await this.usersService.clear()
    }

    @Post()
    async create(@Body() { login }: CreateUserDTO) {
        return this.usersService.createUser({ login })
    }
}
