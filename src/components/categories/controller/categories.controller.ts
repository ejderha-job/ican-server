import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";
import { CategoriesService } from '../service/categories.service';
import { CategoryDto } from 'src/common/dto/category.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) {
    }
    @Get()
    async getCategories() {
        return this.categoriesService.getAllCategories()
    }
    @Post()
    async createCategories(@Body() category: CategoryDto) {
        return this.categoriesService.createCategory(category)
    }
    @Delete()
    async clearCategories() {
        return this.categoriesService.clearCountries()
    }
}
