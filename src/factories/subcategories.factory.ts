import {define} from "typeorm-seeding";
import {Faker} from "@faker-js/faker";
import {Subcategories} from "../subcategories/subcategories.entity";

define(Subcategories, (faker: typeof Faker) => {
    const subcategories = new Subcategories()
    subcategories.title = "lol"
    return subcategories
})