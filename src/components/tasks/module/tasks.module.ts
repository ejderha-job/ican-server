import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersModule} from "../../users/users.module";
import { TasksEntity } from 'src/typeorm/tasks.entity';
import { SubcategoriesModule } from 'src/components/subcategories/module/subcategories.module';
import { TasksService } from '../service/tasks.service';
import { TasksController } from '../controller/tasks.controller';

@Module({
    imports: [TypeOrmModule.forFeature([TasksEntity]), SubcategoriesModule, UsersModule],
    providers:[TasksService],
    controllers:[TasksController],
})
export class TasksModule {

}
