import {Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {CreateUser} from "../dto";
import {LoginUser} from "./dto/dto";

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
