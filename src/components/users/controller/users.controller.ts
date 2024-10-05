import { Body, Controller, Delete, Get, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from "../service/users.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ChooseExecuterDTO, CreateUserDTO } from '../../../common/dto/users.dto';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { FileInterceptor } from '@nestjs/platform-express';
import { IsAuth } from 'src/guard/isAuth';

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

    @ApiOperation({ summary: "create" })
    @Post("create")
    async create(@Body() createUser: CreateUserDTO) {
        return await this.usersService.createUser(createUser)
    }

    @Patch()
    async update(@Req() req: Request, @Body() body) {
        const userID = this.jwtService.decode(req.cookies.token).id
        return await this.usersService.updateUser(body, userID)
    }

    @Get("chooseExecuter")
    @UseGuards(IsAuth)
    @ApiOperation({ summary: "chooseExecuter" })
    async chooseExecuter(@Req() req: Request, @Body() {taskID, userID}:ChooseExecuterDTO) {
        // @ts-ignore
        const im = req.userID
        
        return im
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
