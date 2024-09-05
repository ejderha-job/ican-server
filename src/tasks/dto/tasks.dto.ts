export class createTaskDTO {
    categoryID:number
    task: taskDTO
}

export class taskDTO {
    name: string
    price: number
    description: string
}

export class getTaskDTO {
    subcategoriesIDs?:number[]
}