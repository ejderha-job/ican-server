import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { CountriesService } from '../service/countries.service';
import { CountriesController } from '../controller/countries.controller';
import { CountryEntity } from 'src/typeorm/countries.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CountryEntity])],
  providers: [CountriesService],
  controllers: [CountriesController]
})
export class CountriesModule {}
