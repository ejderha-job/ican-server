import {define} from "typeorm-seeding";
import {Countries} from "../countries/countries.entity";
import {faker} from "@faker-js/faker";

define(Countries, () => {
    const country = new Countries()
    country.title = faker.location.city()
    return country
})