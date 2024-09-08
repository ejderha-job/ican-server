import {define} from "typeorm-seeding";
import {Faker} from "@faker-js/faker";
import {Categories} from "../modules/categories/entity/categories.entity";

define(Categories, (faker: typeof Faker) => {
    const categories = new Categories()
    categories.name = "Categories"
    return categories
})