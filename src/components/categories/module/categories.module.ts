import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CategoriesController} from "../controller/categories.controller";
import { CategoryEntity } from 'src/typeorm/categories.entity';
import { CategoriesService } from '../service/categories.service';

@Module({
    imports:[TypeOrmModule.forFeature([CategoryEntity])],
    providers:[CategoriesService],
    controllers:[CategoriesController],
    exports:[CategoriesService]
})
export class CategoriesModule {}
