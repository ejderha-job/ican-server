import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { TasksEntity } from "src/typeorm/tasks.entity";

export class CreateUserDTO {
    @ApiProperty()
    @IsString()
    login:string
    @ApiProperty()
    @IsOptional()
    @IsString()
    password?:string
}

export class EditUserDTO {
    @ApiProperty()
    @IsOptional()
    @MinLength(6)
    @IsString()
    password?: string
    @IsString()
    @ApiProperty()
    fio: string
    @ApiProperty()
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