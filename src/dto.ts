import {IsString, IsOptional} from "class-validator";

export class CreateUser {
    @IsString()
    login:string
    @IsOptional()
    @IsString()
    password?:string
}