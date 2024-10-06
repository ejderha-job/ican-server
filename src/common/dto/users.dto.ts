import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { TasksEntity } from "src/typeorm/tasks.entity";

export class CreateUserDTO {
    @ApiProperty()
    @IsString()
    login: string
    @ApiProperty()
    @IsOptional()
    @IsString()
    password?: string
}

export class AvatarDTO {
    @IsNumber()
    userID: number
    file: Buffer
    @IsString()
    filename: string
}

export class UpdateUserDTO {
    @IsOptional()
    fio?: string
    @IsOptional()
    avatar?: string
    @IsOptional()
    login?: string
    @IsOptional()
    password?: string
    @IsOptional()
    tasks?: Array<TasksEntity>;
    @IsOptional()
    tasksWhereImExecuter?: TasksEntity[]
}

export class InsertUserDTO {
    @IsOptional()
    fio?: string
    @IsOptional()
    avatar?: string
    @IsOptional()
    login?: string
    @IsOptional()
    password?: string
}

export class ChooseExecuterDTO {
    @IsNumber()
    @ApiProperty()
    userID: number
    @IsNumber()
    @ApiProperty()
    taskID: number
}

export class chooseExecuterDTO {
    @IsNumber()
    @ApiProperty()
    MyID: number
    @IsNumber()
    @ApiProperty()
    TaskID: number
    @IsNumber()
    @ApiProperty()
    ExecuterID: number
}