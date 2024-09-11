import { IsEmail, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

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
}

export class AvatarDTO {
    @IsNumber()
    userID:number
    file: Buffer
    @IsString()
    filename: string
}