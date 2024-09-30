import { TodoEntity } from "src/common/entities/todo.entity"

export class CreatedTodoDto {
    id?: number;
    title: string;
    description: string;
    dueTime: Date;
    status: boolean;
    priority: number;
    userId: number;
}