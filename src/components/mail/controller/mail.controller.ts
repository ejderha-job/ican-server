import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { MailService } from '../service/mail.service';
import { GetCodeDTO } from 'src/common/dto/auth.dto';
import { SendCodeDTO } from 'src/common/dto/mail.dto';

@ApiTags('mail')
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
        res.cookie('token', userID)
        res.send()
    }
}
