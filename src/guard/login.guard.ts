import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { plainToClass } from "class-transformer"
import { validate } from "class-validator"
import { LoginDTO } from "src/modules/auth/dto/dto"

@Injectable()
export class MyAuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest<Request>()
        const body = plainToClass(LoginDTO, request.body)
        const errors = await validate(body)
        const errorsMessages = errors.flatMap(({ constraints }) => Object.values(constraints))

        if (errorsMessages.length > 0) {
            throw new HttpException("Ошибка в теле запроса", HttpStatus.BAD_REQUEST);
        }

        return true
    }
}