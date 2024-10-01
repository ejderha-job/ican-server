import { Injectable } from '@nestjs/common';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from 'src/typeorm/categories.entity';
import { CreateCategoryDto } from 'src/common/dto/category.dto';

@Injectable()
export class CategoriesService {
    constructor(@InjectRepository(CategoryEntity) private categoriesRepository: Repository<CategoryEntity>) {
    }
    async getAllCategories() {
        return await this.categoriesRepository.find({ relations: { subcategories: true } })
    }
    async createCategory(category: CreateCategoryDto) {
        const newCategory = new CategoryEntity()
        newCategory.name = category.name
        return await this.categoriesRepository.save(newCategory)
    }
    async clearCountries() {
        return await this.categoriesRepository.delete({})
    }
    async getCategory(categoryID: number) {
        return await this.categoriesRepository.findOneBy({ id: categoryID })
    }
}
