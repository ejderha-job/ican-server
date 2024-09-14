import { Body, Controller, Delete, Get, HttpStatus, Post } from '@nestjs/common';
import { CountriesService } from "./countries.service";
import { CountriesDTO } from "./dto/countries.dto";
import { ApiBadRequestResponse, ApiBody, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Countries } from './entity/countries.entity';

@ApiTags('countries')
@Controller('countries')
export class CountriesController {
    constructor(private countriesService: CountriesService) { }

    @ApiOkResponse({ status: HttpStatus.OK, isArray: true, type: Countries })
    @Get()
    async getCountries() {
        return await this.countriesService.getCountries()
    }

    @ApiBadRequestResponse({ status: HttpStatus.BAD_REQUEST })
    @ApiOkResponse({ status: HttpStatus.OK, isArray: true, type: Countries })
    @ApiBody({ type: CountriesDTO })
    @Post()
    async createCountries(@Body() body: CountriesDTO) {
        return await this.countriesService.createCountries(body.countries)
    }

    @ApiOkResponse({ status: HttpStatus.OK })
    @Delete()
    async clearCountries() {
        return await this.countriesService.clearCountries()
    }
}
