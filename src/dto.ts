import {IsString} from "class-validator";

export class CreateUser {
    @IsString()
    login:string
    @IsString()
    password:string
}