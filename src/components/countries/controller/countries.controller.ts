import { Body, Controller, Delete, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { CountriesService } from '../service/countries.service';
import { CountryEntity } from 'src/typeorm/countries.entity';
import { CountriesDTO } from 'src/common/dto/countries.dto';

@ApiTags('countries')
@Controller('countries')
export class CountriesController {
    constructor(private countriesService: CountriesService) { }

    @ApiOkResponse({ status: HttpStatus.OK, isArray: true, type: CountryEntity })
    @Get()
    async getCountries() {
        return await this.countriesService.getCountries()
    }

    @ApiBadRequestResponse({ status: HttpStatus.BAD_REQUEST })
    @ApiOkResponse({ status: HttpStatus.OK, isArray: true, type: CountryEntity })
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
