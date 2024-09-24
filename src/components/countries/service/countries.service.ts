import { Injectable } from '@nestjs/common';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CountryEntity } from 'src/typeorm/countries.entity';

@Injectable()
export class CountriesService {
    constructor(@InjectRepository(CountryEntity) private countries: Repository<CountryEntity>) { }

    async getCountries() {
        return await this.countries.find()
    }

    async createCountries(newCountries: Array<string>) {
        const countries = newCountries.map(async (county) => {
            const countries = new CountryEntity()
            countries.title = county
            return await this.countries.save(countries)
        })
        return Promise.all(countries)
    }

    async clearCountries() {
        return await this.countries.clear()
    }
}
