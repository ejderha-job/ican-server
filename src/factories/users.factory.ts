import {define} from "typeorm-seeding";
import {Users} from "../users/users.entity";
import {faker} from "@faker-js/faker";

define(Users, () => {
    const user = new Users()
    user.password = faker.internet.password()
    user.login = faker.internet.email()
    return user
})