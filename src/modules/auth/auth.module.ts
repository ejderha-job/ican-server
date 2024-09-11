import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from "../users/users.module";
import { LocalStrategy } from "./strategy/local.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { GitHubStrategy } from "./strategy/github.strategy";
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';

const strategies = [LocalStrategy, JwtStrategy, GitHubStrategy]

@Module({
    providers: [AuthService, ...strategies],
    imports: [UsersModule, PassportModule, JwtModule.registerAsync({
        useFactory: async (configService: ConfigService) => ({
            secret: configService.get("JWT_SECRET"),
            signOptions: { expiresIn: '600s' }
        }),
        inject: [ConfigService],
    }),
    ],
    exports: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {
}
