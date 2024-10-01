import { Body, Controller, Delete, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CategoriesService } from '../service/categories.service';
import { CreateCategoryDto } from 'src/common/dto/category.dto';
import { CategoryEntity } from 'src/typeorm/categories.entity';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) {}
    
    @ApiOkResponse({ type: CategoryEntity })
    @ApiOperation({ summary: "get category list" })
    @Get()
    async getCategories() {
        return this.categoriesService.getAllCategories()
    }
    
    @ApiOperation({ summary: "create category" })
    @ApiOkResponse({ status: HttpStatus.OK, type: CategoryEntity })
    @Post()
    async createCategories(@Body() category: CreateCategoryDto) {
        return this.categoriesService.createCategory(category)
    }
    
    @ApiOperation({ summary: "delet all categories" })
    @Delete()
    async clearCategories() {
        return this.categoriesService.clearCountries()
    }
}
