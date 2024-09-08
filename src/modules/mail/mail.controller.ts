import { Body, Controller, Post } from '@nestjs/common';
import { GetCodeDTO, SendCodeDTO } from './dto/dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
    constructor(private MailService: MailService) { }

    @Post("/getCode")
    async getCode(@Body() body: GetCodeDTO) {
        return await this.MailService.getCode(body.mail)
    }

    @Post("/sendCode")
    async sendCode(@Body() body: SendCodeDTO) {
        return await this.MailService.sendCode(body)
    }
}
