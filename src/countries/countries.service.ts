import { Injectable } from '@nestjs/common';
import { Repository } from "typeorm";
import { Countries } from "./countries.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CountriesService {
    constructor(@InjectRepository(Countries) private countries: Repository<Countries>) { }

    async getCountries() {
        return await this.countries.find()
    }

    async createCountries(newCountries: Array<string>) {
        const countries = newCountries.map(async (county) => {
            const countries = new Countries()
            countries.title = county
            return await this.countries.save(countries)
        })
        return Promise.all(countries)
    }

    async clearCountries() {
        return await this.countries.clear()
    }
}
