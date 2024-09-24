import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SubcategoryEntity } from "./subcategories.entity";
import { UserEntity } from "./users.entity";
import { taskDTO } from "src/common/dto/tasks.dto";

@Entity()
export class TasksEntity {
    @PrimaryGeneratedColumn("uuid")
    id: number;
    @ManyToOne(() => UserEntity, (Users) => Users.tasks, { onDelete: "CASCADE" })
    user: UserEntity;
    @ManyToMany(() => SubcategoryEntity, (subcategory) => subcategory.tasks)
    Subcategory: SubcategoryEntity
    @Column("simple-json")
    props: taskDTO
    @ManyToMany(() => UserEntity, (users) => users.tasksWhereImExecuter)
    executers: UserEntity[]
}