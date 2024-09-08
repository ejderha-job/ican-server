import {define} from "typeorm-seeding";
import {faker} from "@faker-js/faker";
import { Users } from "src/modules/users/users.entity";

define(Users, () => {
    const user = new Users()
    user.password = faker.internet.password()
    user.login = faker.internet.email()
    return user
})