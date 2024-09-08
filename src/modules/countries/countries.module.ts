import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Countries} from "./entity/countries.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Countries])],
  providers: [CountriesService],
  controllers: [CountriesController]
})
export class CountriesModule {}
