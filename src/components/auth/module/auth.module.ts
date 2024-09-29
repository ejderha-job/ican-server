import { Module } from '@nestjs/common';
import { UsersModule } from "../../users/module/users.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from '@nestjs/config';
import { LocalStrategy } from 'src/strategy/local.strategy';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { GitHubStrategy } from 'src/strategy/github.strategy';
import { AuthService } from '../service/auth.service';
import { AuthController } from '../controller/auth.controller';

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
