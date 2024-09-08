import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UsersModule} from "../users/users.module";
import {LocalStrategy} from "./strategy/local.strategy";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./constants";
import {JwtStrategy} from "./strategy/jwt.strategy";
import {GitHubStrategy} from "./strategy/github.strategy";
import { AuthController } from './auth.controller';

const strategies = [LocalStrategy, JwtStrategy, GitHubStrategy]

@Module({
    providers: [AuthService, ...strategies],
    imports: [UsersModule, PassportModule, JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: {expiresIn: '600s'}
    }),
    ],
    exports: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {
}
