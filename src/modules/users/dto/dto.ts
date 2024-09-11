import { IsEmail } from "class-validator";

export class CreateUserDTO {
    @IsEmail()
    login: string
}