import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SubcategoryEntity } from "./subcategories.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class CategoryEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    @ApiProperty()
    name: string;
    @ApiProperty()
    @OneToMany(() => SubcategoryEntity, (subcategories) => subcategories.category)
    subcategories: SubcategoryEntity[]
}