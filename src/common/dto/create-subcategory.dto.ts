import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class CreateSubcategoryDto {
    @IsNumber()
    @ApiProperty()
    categoryID:number
    @ApiProperty()
    @IsString()
    title:string
}
