import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber } from "class-validator"

export class taskDTO {
    @ApiProperty()
    name: string
    @ApiProperty()
    price: number
    @ApiProperty()
    description: string
}

export class createTaskDTO {
    @ApiProperty()
    categoryID: number
    @ApiProperty()
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