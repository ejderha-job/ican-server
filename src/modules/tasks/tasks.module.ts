import { Module } from '@nestjs/common';
import {TasksService} from "./tasks.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Tasks} from "./entity/tasks.entity";
import {TasksController} from "./tasks.controller";
import {UsersModule} from "../users/users.module";
import {SubcategoriesModule} from "../subcategories/subcategories.module";

@Module({
    imports: [TypeOrmModule.forFeature([Tasks]), SubcategoriesModule, UsersModule],
    providers:[TasksService],
    controllers:[TasksController],
})
export class TasksModule {

}
