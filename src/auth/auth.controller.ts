import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from "../guard/local-auth.guard";
import { GithubAuthGuard } from "../guard/github-auth";
import { AuthService } from "./auth.service";
import { CreateUser } from "../dto";
import { ApiExcludeEndpoint, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { MyAuthGuard } from 'src/guard/login.guard';
import { Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @UseGuards(LocalAuthGuard)
    @UseGuards(MyAuthGuard)
    @ApiOperation({ summary: "login" })
    @ApiResponse({ status: 200, description: "jwt token" })
    @ApiResponse({ status: 401, description: "unauthorized" })
    @Post('login')
    async login(@Req() req, @Res() res: Response) {
        const accessToken = await this.authService.login(req.user)
        res.cookie('token', accessToken, { httpOnly: true, sameSite: 'none', secure: false })
        return res.send(accessToken)
    }

    @ApiOperation({ summary: "register" })
    @Post('register')
    async register(@Body() user: CreateUser) {
        const userID = await this.authService.register(user);
        if (userID) return userID
        throw new HttpException("Не удалось создать пользователя", HttpStatus.BAD_REQUEST)
    }

    @ApiOperation({ summary: "login throw github" })
    @UseGuards(GithubAuthGuard)
    @Get('github')
    async getProfile(@Req() req) {
        return req.user
    }

    @ApiExcludeEndpoint()
    @UseGuards(GithubAuthGuard)
    @Get('github/callback')
    async callback(@Req() req, @Res() res) {
        const { id, login } = req.user
        const accessToken = await this.authService.login({ id, login })
        return res.json({ accessToken: accessToken })
    }
}
