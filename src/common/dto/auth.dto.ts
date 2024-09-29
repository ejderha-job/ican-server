import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class LoginUserDTO {
    id: string
    login: string
}

export class LoginDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    username: string
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string
}

export class GetCodeDTO {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    mail: string
}