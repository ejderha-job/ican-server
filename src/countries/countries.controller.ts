import {Body, Controller, Delete, Get, Post} from '@nestjs/common';
import {CountriesService} from "./countries.service";
import {CountriesDTO} from "./countries.dto";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('countries')
@Controller('countries')
export class CountriesController {
    constructor(private countriesService: CountriesService) {}
    @Get('')
    async getCountries() {
        return await this.countriesService.getCountries()
    }
    @Post('')
    async createCountries(@Body() body:CountriesDTO) {
        return await this.countriesService.createCountries(body.countries)
    }
    @Delete('')
    async clearCountries(){
        return await this.countriesService.clearCountries()
    }
}
