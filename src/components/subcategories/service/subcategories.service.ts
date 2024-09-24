import { Injectable } from '@nestjs/common';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { SubcategoryEntity } from 'src/typeorm/subcategories.entity';
import { CreateSubcategoryDto } from 'src/common/dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from 'src/common/dto/update-subcategory.dto';

@Injectable()
export class SubcategoriesService {
    constructor(@InjectRepository(SubcategoryEntity) private subcategories: Repository<SubcategoryEntity>) {
    }

    async create({ title, categoryID }: CreateSubcategoryDto) {
        const category = await this.subcategories.findOneBy({ id: categoryID })
        if (!category) {
            return null
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
