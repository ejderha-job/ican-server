import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { SubcategoriesService } from '../service/subcategories.service';
import { CreateSubcategoryDto } from 'src/common/dto/create-subcategory.dto';

@ApiTags('Subcategories')
@Controller('subcategories')
export class SubcategoriesController {
  constructor(private readonly subcategoriesService: SubcategoriesService) { }

  @Post()
  @ApiParam({ name: "title", required: true, description: "Название подкатегории" })
  @ApiParam({ name: "categoryID", required: true, description: "ID категории" })
  async create(@Body() createSubcategoryDto: CreateSubcategoryDto) {
    return await this.subcategoriesService.create(createSubcategoryDto);
  }

  @Get()
  findAll() {
    return this.subcategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subcategoriesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subcategoriesService.remove(+id);
  }
}
