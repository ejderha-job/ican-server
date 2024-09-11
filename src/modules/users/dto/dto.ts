import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDTO {
    @IsEmail()
    login: string
}

export class EditUser {
    @IsOptional()
    @MinLength(6)
    @IsString()
    password?: string
    @IsString()
    fio: string
    @IsString()
    avatar: string
}