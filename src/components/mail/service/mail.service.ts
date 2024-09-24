import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpException, HttpStatus, Inject, Injectable, UseGuards } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { createTransport } from 'nodemailer';
import { env } from 'process';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/components/users/users.service';
import { isEmailExist } from 'src/guard/isEmailExist';
import { SendCodeDTO } from 'src/common/dto/mail.dto';

@Injectable()
export class MailService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    @UseGuards(isEmailExist) 
    async getCode(login: string) {
        
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

        const user = await this.usersService.createUser({ login: mail })
        
        if (!user) {
            throw new HttpException('Такой пользовател уже создан', HttpStatus.CONFLICT)
        }

        return this.jwtService.sign({ id: user.id })
    }
}
