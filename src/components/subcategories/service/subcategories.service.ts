import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { SubcategoryEntity } from 'src/typeorm/subcategories.entity';
import { CreateSubcategoryDto } from 'src/common/dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from 'src/common/dto/update-subcategory.dto';
import { CategoryEntity } from 'src/typeorm/categories.entity';

@Injectable()
export class SubcategoriesService {
    constructor(
        @InjectRepository(SubcategoryEntity) private subcategories: Repository<SubcategoryEntity>,
        @InjectRepository(CategoryEntity) private categoryRepo: Repository<CategoryEntity>,
    ) {}

    async create({ title, categoryID }: CreateSubcategoryDto) {
        const category = await this.categoryRepo.findOneBy({ id: categoryID })
        if (!category) {
            throw new HttpException("Категория не выбрана", HttpStatus.BAD_REQUEST)
        }
        const subcategories = this.subcategories.create({ title, category })
        return await this.subcategories.save(subcategories)
    }

    async findAll() {
        return await this.subcategories.find();
    }

    findOne(id: number) {
        return this.subcategories.findOneBy({ id })
    }

    update(id: number, updateSubcategoryDto: UpdateSubcategoryDto) {
        return `This action updates a #${id} subcategory`;
    }

    remove(id: number) {
        return `This action removes a #${id} subcategory`;
    }
}
