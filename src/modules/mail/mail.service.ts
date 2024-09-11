import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { createTransport } from 'nodemailer';
import { SendCodeDTO } from './dto/dto';
import { env } from 'process';
import { UsersService } from '../users/users.service';

@Injectable()
export class MailService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private usersService: UsersService
    ) { }

    async getCode(login: string) {
        const user = await this.usersService.findOne(login)

        if (user) {
            throw new HttpException('Польззователь с таким логином уже зарегистрирован', HttpStatus.CONFLICT);
        }

        const code = Math.floor(Math.random() * 1000)

        await this.cacheManager.set(login, code, 60000)

        const transporter = createTransport({
            host: "smtp.yandex.ru",
            port: 465,
            secure: true,
            service: "Yandex",
            auth: {
                user: env.MAIL_USER,
                pass: env.MAIL_PASS
            }
        });

        await transporter.sendMail({
            from: env.MAIL_USER, to: login, subject: "Hello ✔",
            text: `lol`,
            html: `<b>мой код ${code}</b>`
        })

        return "Код был  отправлен вам на почту"
    }

    async sendCode({ code: inputCode, mail }: SendCodeDTO) {
        const correctCode = await this.cacheManager.get(mail)

        if (correctCode != inputCode) {
            throw new HttpException('invalid code', HttpStatus.BAD_REQUEST)
        }

        return await this.usersService.createUser({ login: mail })
    }
}
