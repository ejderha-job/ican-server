import {Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {LoginUser} from "./dto/dto";
import { UsersService } from '../users/users.service';
import { CreateUser } from 'src/dto';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {
    }

    async validateUser(username: string, password: string) {
        const user = await this.usersService.findOne(username)
        if (user && user.password === password) {
            return user
        }
        return null
    }

    async login(user:LoginUser) {
        const payload = {
            username: user.login, id: user.id
        }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async register(user:CreateUser) {
        const newUser = await this.usersService.createUser(user)
        if (newUser){
            return newUser.id
        }
    }
}
