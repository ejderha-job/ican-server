import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {Injectable, UnauthorizedException} from "@nestjs/common";
import { AuthService } from "src/components/auth/service/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
            // const user = await this.authService.validateUser(username, password)
            // if (!user){
            //     throw new UnauthorizedException()
            // }
            // return user
    }
}