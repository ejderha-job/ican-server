import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from "../guard/local-auth.guard";
import { GithubAuthGuard } from "../guard/github-auth";
import { AuthService } from "./auth.service";
import { CreateUser } from "../dto";
import { ApiExcludeEndpoint, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { MyAuthGuard } from 'src/guard/login.guard';
import { Response } from 'express';
import { createTransport } from 'nodemailer';

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

    @Post("/mail")
    async mail() {
        let transporter = createTransport({
            service: "gmail",
            auth: {
                type: "oauth2",
                clientId: "917267820831-1utlegabmhojrkjgdurkk3j3jh6dnr1d.apps.googleusercontent.com",
                clientSecret: "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",
                refreshToken: "1//04XeOivbl5B16CgYIARAAGAQSNwF-L9IrOMIiRyfjwdYYaf17khHOy6XubqDtK6AqeVy5DO0bsDuyqu63xnVYscG8dUp35fT3PT0",
                user: "sergey"
            }
        });

        transporter.sendMail({
            from: "s.k.m.sergey2024@gmail.com", to: "neyedim383@svters.com", subject: "Hello ✔",
            text: "Hello world?",
            html: "<b>Hello world?</b>"
        })
    }
}
