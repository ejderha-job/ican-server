import { Body, Controller, Delete, Get, Patch, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UsersService } from "./users.service";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserDTO, EditUser } from './dto/dto';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

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

    @Patch()
    async update(@Req() req: Request, @Body() body: EditUser) {
        const userID = this.jwtService.decode(req.cookies.token).id
        return await this.usersService.updateUser(body, userID)
    }

    @Post("avatar")
    @UseInterceptors(FileInterceptor('file'))
    async avatar(
        @UploadedFile() { buffer, originalname }: Express.Multer.File,
        @Req() req: Request
    ) {
        const userID = this.jwtService.decode(req.cookies.token).id
        return await this.usersService.avatarUpload({ file: buffer, filename: originalname, userID })
    }
}
