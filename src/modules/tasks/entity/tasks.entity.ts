import {Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Users} from "../../users/users.entity";
import {taskDTO} from "../dto/tasks.dto";
import { Subcategories } from "src/modules/subcategories/entity/subcategories.entity";

@Entity()
export class Tasks {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(()=>Users, (Users)=>Users.tasks, {cascade:true})
    user: Users;
    @ManyToMany(()=>Subcategories,(subcategory)=>subcategory.tasks)
    Subcategory: Subcategories
    @Column("simple-json")
    props: taskDTO
}