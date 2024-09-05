import {Injectable} from '@nestjs/common';
import {CreateSubcategoryDto} from './dto/create-subcategory.dto';
import {UpdateSubcategoryDto} from './dto/update-subcategory.dto';
import {Repository} from "typeorm";
import {Subcategories} from "./subcategories.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class SubcategoriesService {
    constructor(@InjectRepository(Subcategories) private subcategories: Repository<Subcategories>) {
    }

    async create({title, categoryID}: CreateSubcategoryDto) {
        const category = await this.subcategories.findOneBy({id:categoryID})
        if (!category) {
            return null
        }
        const subcategories = this.subcategories.create({title, category})
        return await this.subcategories.save(subcategories)
    }

    async findAll() {
        return await this.subcategories.find();
    }

    findOne(id: number) {
        return this.subcategories.findOneBy({id})
    }

    update(id: number, updateSubcategoryDto: UpdateSubcategoryDto) {
        return `This action updates a #${id} subcategory`;
    }

    remove(id: number) {
        return `This action removes a #${id} subcategory`;
    }
}
