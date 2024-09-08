import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { createTransport } from 'nodemailer';
import { SendCodeDTO } from './dto/dto';
import { env } from 'process';

@Injectable()
export class MailService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async getCode(mail: string) {
        const code = Math.floor(Math.random() * 1000)

        await this.cacheManager.set(mail, code, 60000)

        const transporter = createTransport({
            host:"smtp.yandex.ru",
            port:465,
            secure: true,
            service: "Yandex",
            auth: {
                user: env.MAIL_USER,
                pass: env.MAIL_PASS
            }
        });

        await transporter.sendMail({
            from: env.MAIL_USER, to: mail, subject: "Hello ✔",
            text: `lol`,
            html: `<b>мой код ${code}</b>`
        })
        
        return "Код был  отправлен вам на почту"
    }

    async sendCode({ code: inputCode, mail }: SendCodeDTO) {
        const correctCode = await this.cacheManager.get(mail)
        
        if (correctCode == inputCode) {
            return "Всё верно"
        } else {
            return "Ошибка"
        }
    }
}
