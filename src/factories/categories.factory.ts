import {define} from "typeorm-seeding";
import {Faker} from "@faker-js/faker";
import {Categories} from "../categories/categories.entity";

define(Categories, (faker: typeof Faker) => {
    const categories = new Categories()
    categories.name = "Categories"
    return categories
})