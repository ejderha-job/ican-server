import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tasks } from "../../tasks/entity/tasks.entity";

@Entity()
export class Users {
    @Column({ nullable: true })
    fio: string
    @Column({ nullable: true })
    avatar: string
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    login: string
    @Column({ nullable: true })
    password: string
    @OneToMany(() => Tasks, Tasks => Tasks.user, { onDelete: "CASCADE" })
    tasks: Array<Tasks>;
}