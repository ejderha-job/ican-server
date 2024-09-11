import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { CacheModule } from '@nestjs/cache-manager';
import { UsersModule } from '../users/users.module';
 
// Время жизни кеша - используется для сохранения кода доступа
const ttl = 200

@Module({
  imports: [
    CacheModule.register({ ttl }), UsersModule
  ],
  controllers: [MailController],
  providers: [MailService]
})
export class MailModule { }
