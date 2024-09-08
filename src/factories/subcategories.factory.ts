import {define} from "typeorm-seeding";
import {Faker} from "@faker-js/faker";
import { Subcategories } from "src/modules/subcategories/entity/subcategories.entity";

define(Subcategories, (faker: typeof Faker) => {
    const subcategories = new Subcategories()
    subcategories.title = "lol"
    return subcategories
})