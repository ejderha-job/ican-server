import { Body, Controller, Get, Post } from '@nestjs/common';
import { GetCodeDTO, SendCodeDTO } from './dto/dto';
import { MailService } from './mail.service';
import { env } from 'process';

@Controller('mail')
export class MailController {
    constructor(private MailService: MailService) {}

    @Post("/getCode")
    async getCode(@Body() body: GetCodeDTO) {
        return await this.MailService.getCode(body.mail)
    }

    @Post("/sendCode")
    async sendCode(@Body() body: SendCodeDTO) {
        return await this.MailService.sendCode(body)
    }

    @Get("/test")
    async test() {
        return env.POSTGRES_USERNAME
    }
}
