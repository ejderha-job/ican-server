import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

export class CountriesDTO {
    @IsArray()
    @IsString({ each: true })
    @ApiProperty()
    countries: Array<string>
}   