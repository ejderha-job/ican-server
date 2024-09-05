import {define} from "typeorm-seeding";
import {Tasks} from "../tasks/tasks.entity";
import {faker} from "@faker-js/faker";

define(Tasks, () => {
    const props = {
        name: faker.commerce.price(),
        price: 1000,
        description: faker.lorem.paragraph()
    }
    const tasks = new Tasks()
    tasks.props = props
    return tasks
})