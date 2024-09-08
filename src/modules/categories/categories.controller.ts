import {Body, Controller, Delete, Get, Post} from '@nestjs/common';
import {CategoriesService} from "./categories.service";
import {CategoriesDto} from "./dto/categories.dto";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) {
    }
    @Get()
    async getCategories(){
        return this.categoriesService.getAllCategories()
    }
    @Post()
    async createCategories(@Body() category:CategoriesDto){
        return this.categoriesService.createCategory(category)
    }
    @Delete()
    async clearCategories(){
        return this.categoriesService.clearCountries()
    }
}
