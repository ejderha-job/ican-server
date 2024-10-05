import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator"

export class taskDTO {
    @IsString()
    @ApiProperty()
    name: string
    @IsNumber()
    @ApiProperty()
    price: number
    @ApiProperty()
    @IsString()
    description: string
}

export class createTaskDTO {
    @IsNumber()
    @ApiProperty()
    categoryID: number
    @ApiProperty()
    @ValidateNested()
    @Type(()=>taskDTO)
    task: taskDTO
}

export class getTaskDTO {
    subcategoriesIDs?: number[]
}

export class takeTaskDTO {
    @IsNumber()
    @IsNotEmpty()
    userID: number
    @IsNumber()
    @IsNotEmpty()
    taskID: number
}

export class takeTaskControllerDTO {
    @IsNumber()
    @IsNotEmpty()
    taskID: number
}