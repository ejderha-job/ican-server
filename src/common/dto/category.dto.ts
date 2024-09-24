import { TasksEntity } from "src/typeorm/tasks.entity";

export class CategoryDto {
    name: string;
    tasks?: TasksEntity[]
}