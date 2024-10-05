import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
@Injectable()
export class IsAuth implements CanActivate {
    constructor(private jwtService: JwtService) {
    }
    async canActivate(context: ExecutionContext) {
        const {getRequest} = context.switchToHttp()
        const req = getRequest()
        if (!Boolean(req.headers.authorization)) {
            throw new HttpException("unuftorizated", HttpStatus.UNAUTHORIZED)   
        }
        const token = req.headers.authorization.split(" ")[1]
        const userID = (await this.jwtService.decode(token)).id
        req.userID = userID
        return true
    }
}