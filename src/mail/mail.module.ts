import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register({ttl:200})],
  controllers: [MailController],
  providers: [MailService]
})
export class MailModule {}
