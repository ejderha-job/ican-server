import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SubcategoryEntity } from "./subcategories.entity";

@Entity()
export class CategoryEntity {
    @PrimaryGeneratedColumn("uuid")
    id: number;
    @Column()
    name: string;
    @OneToMany(() => SubcategoryEntity, (subcategories) => subcategories.category)
    subcategories: SubcategoryEntity[]
}