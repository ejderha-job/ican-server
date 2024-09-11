import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Request } from "express";
import { UsersService } from "src/modules/users/users.service";

@Injectable()
export class isEmailExist implements CanActivate {
    constructor(private usersService: UsersService) { }
    
    async canActivate(context: ExecutionContext) {
        const req:Request = context.switchToHttp().getRequest()
        const user = await this.usersService.findOne(req.body.login)

        if (user) {
            return false
        }

        return true
    }
}