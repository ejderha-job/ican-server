import {define} from "typeorm-seeding";
import {faker} from "@faker-js/faker";
import { Tasks } from "src/modules/tasks/entity/tasks.entity";

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