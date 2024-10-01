import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { SubcategoriesController } from '../controller/subcategories.controller';
import { SubcategoriesService } from '../service/subcategories.service';
import { SubcategoryEntity } from 'src/typeorm/subcategories.entity';
import { CategoryEntity } from 'src/typeorm/categories.entity';

@Module({
  controllers: [SubcategoriesController],
  providers: [SubcategoriesService],
  imports: [TypeOrmModule.forFeature([SubcategoryEntity, CategoryEntity])],
  exports: [SubcategoriesService]
})
export class SubcategoriesModule {}
