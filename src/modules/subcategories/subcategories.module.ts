import { Module } from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';
import { SubcategoriesController } from './subcategories.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import { Subcategories } from './entity/subcategories.entity';

@Module({
  controllers: [SubcategoriesController],
  providers: [SubcategoriesService],
  imports: [TypeOrmModule.forFeature([Subcategories])],
  exports: [SubcategoriesService]
})
export class SubcategoriesModule {}
