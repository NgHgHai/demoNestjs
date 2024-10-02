import { TodoEntity } from "src/common/entities/todo.entity"
import { IsInt, IsNotEmpty, IsOptional, IsString, IsDate } from 'class-validator';


export class CreatedTodoDto {
    @IsOptional()
    @IsInt()
    id?: number;

    @IsNotEmpty({ message: 'Title is required' })
    @IsString()
    title: string;

    @IsNotEmpty({ message: 'Description is required' })
    @IsString()
    description: string;

    @IsNotEmpty({ message: 'Due time is required' })
    @IsDate({ message: 'Due time must be a date' })
    dueTime: Date;

    @IsNotEmpty({ message: 'Status is required' })
    @IsInt({ message: 'Status must be a number' })
    status: number;

    @IsNotEmpty({ message: 'Priority is required' })
    @IsInt()
    priority: number;

    @IsNotEmpty({ message: 'User id is required' })
    @IsInt()
    userId: number;
}
