import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class GetCodeDTO {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    mail: string
}

export class SendCodeDTO extends GetCodeDTO {
    @IsNumber()
    @IsNotEmpty()
    code: number
}