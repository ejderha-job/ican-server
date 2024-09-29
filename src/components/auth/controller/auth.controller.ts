import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GithubAuthGuard } from 'src/guard/github-auth';
import { AuthService } from '../service/auth.service';
import { LoginDTO } from 'src/common/dto/auth.dto';
import { CreateUserDTO } from 'src/common/dto/users.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @ApiOperation({ summary: "login" })
    @ApiResponse({ status: 200, description: "jwt token" })
    @ApiResponse({ status: 401, description: "unauthorized" })
    @Post('login')
    async login(@Body() login:LoginDTO) {
        return this.authService.login(login)
    }

    // @ApiOperation({ summary: "register" })
    // @Post('register')
    // async register(@Body() user: CreateUserDTO) {
    //     const userID = await this.authService.register(user);
    //     if (userID) return userID
    //     throw new HttpException("Не удалось создать пользователя", HttpStatus.BAD_REQUEST)
    // }

    @ApiOperation({ summary: "login throw github" })
    @UseGuards(GithubAuthGuard)
    @Get('github')
    async getProfile(@Req() req) {
        return req.user
    }

    // @ApiExcludeEndpoint()
    // @UseGuards(GithubAuthGuard)
    // @Get('github/callback')
    // async callback(@Req() req, @Res() res) {
    //     const { id, login } = req.user
    //     const accessToken = await this.authService.login({ id, login })
    //     return res.json({ accessToken: accessToken })
    // }
}
