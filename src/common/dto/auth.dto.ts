import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class LoginUser {
    id: string
    login: string
}

export class LoginDTO {
    @IsString()
    @IsNotEmpty()
    username: string
    @IsString()
    @IsNotEmpty()
    password: string
}

export class GetCodeDTO {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    mail: string
}