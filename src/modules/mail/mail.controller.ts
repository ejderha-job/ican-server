import { Body, Controller, Post, Res } from '@nestjs/common';
import { GetCodeDTO, SendCodeDTO } from './dto/dto';
import { MailService } from './mail.service';
import { Response } from 'express';

@Controller('mail')
export class MailController {
    constructor(private MailService: MailService) { }

    @Post("/getCode")
    async getCode(@Body() body: GetCodeDTO) {
        return await this.MailService.getCode(body.mail)
    }

    @Post("/sendCode")
    async sendCode(@Body() body: SendCodeDTO, @Res() res: Response) {
        const userID = await this.MailService.sendCode(body)
        res.cookie('demo-token', userID)
        res.send()
    }
}
