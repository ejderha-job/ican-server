import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {Categories} from "./entity/categories.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CategoriesDto} from "./dto/categories.dto";

@Injectable()
export class CategoriesService {
    constructor(@InjectRepository(Categories) private categoriesRepository: Repository<Categories>) {
    }
    async getAllCategories(){
        return await this.categoriesRepository.find({relations:{subcategories:true}})
    }
    async createCategory(category:CategoriesDto){
        const newCategory = new Categories()
        newCategory.name = category.name
        return await this.categoriesRepository.save(newCategory)
    }
    async clearCountries(){
        return await this.categoriesRepository.clear()
    }
    async getCategory(categoryID:number){
        return await this.categoriesRepository.findOneBy({id:categoryID})
    }
}
