import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { UsersModule } from '../../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { isEmailExist } from '../../../guard/isEmailExist';
import { ConfigService } from '@nestjs/config';
import { MailController } from '../controller/mail.controller';
import { MailService } from '../service/mail.service';

// Время жизни кеша - используется для сохранения кода доступа
const ttl = 200

@Module({
  imports: [
    CacheModule.register({ ttl }), UsersModule, JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET"),
        signOptions: { expiresIn: '600s' }
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [MailController],
  providers: [MailService, isEmailExist]
})
export class MailModule { }
