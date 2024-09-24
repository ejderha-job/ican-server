import { IsArray, IsEmail, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { TasksEntity } from "src/typeorm/tasks.entity";

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
    @IsOptional()
    @IsArray()
    tasksWhereImExecuter:Array<TasksEntity>
}

export class AvatarDTO {
    @IsNumber()
    userID:number
    file: Buffer
    @IsString()
    filename: string
}