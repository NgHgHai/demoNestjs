import { Controller, HttpCode, HttpStatus, Post, UseGuards, Request, Body } from '@nestjs/common';
import { TodoService } from './todo.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CreatedTodoDto } from './dtos/createdToDoDto';
import { TodoEntity } from 'src/common/entities/todo.entity';


@UseGuards(AuthGuard)
@Controller('todo')
export class TodoController {
    constructor(
        private readonly todoService: TodoService,

    ) { }
    @HttpCode(HttpStatus.CREATED)
    @Post('create')
    async create(@Request() req, @Body() createdTodoDto: CreatedTodoDto): Promise<TodoEntity> {
        {
            const todo = new TodoEntity();
            todo.title = createdTodoDto.title;
            todo.description = createdTodoDto.description;
            todo.dueTime = createdTodoDto.dueTime;
            todo.status = Number(createdTodoDto.status);
            todo.priority = createdTodoDto.priority;
            todo.userId = createdTodoDto.userId;
            return await this.todoService.create(todo, req.user.username);
        }
    }
}
