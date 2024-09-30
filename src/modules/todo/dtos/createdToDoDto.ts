import { TodoEntity } from "src/common/entities/todo.entity"

//TODO: Validate thêm nha em
export class CreatedTodoDto {
    id?: number;
    title: string;
    description: string;
    dueTime: Date;
    status: boolean;
    priority: number;
    userId: number;
}