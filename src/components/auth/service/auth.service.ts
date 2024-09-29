import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { LoginDTO } from 'src/common/dto/auth.dto';
import { CreateUserDTO } from 'src/common/dto/users.dto';
import { UsersService } from 'src/components/users/service/users.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {
    }

    async login({ password, username }: LoginDTO) {
        const user = await this.usersService.findOne(username)
        if (!user) {
            throw new HttpException('Forbidden', HttpStatus.BAD_REQUEST)
        }
        if (!await compare(password, user.password)) {
            throw new HttpException('Forbidden', HttpStatus.BAD_REQUEST)
        }
        return this.jwtService.sign({ id: user.id })
    }

    async register(user: CreateUserDTO) {
        const newUser = await this.usersService.createUser(user)
        // if (newUser) {
        //     return newUser.id
        // }
    }
}
