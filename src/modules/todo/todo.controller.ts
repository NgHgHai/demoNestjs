import { Controller, HttpCode, HttpStatus, Post, Body, Get, Query, Req, Put, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreatedTodoDto } from './dtos/create.dto';
import { TodoEntity } from 'src/common/entities/todo.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/common/enums/role.enum';
import { Roles } from 'src/common/decorator/roles.decorator';
import { catchErrController } from 'src/utils/error.util';
import { Request } from 'express';
import { GetPaginationDto } from './dtos/get-pagination.dto';
import { HandlerException } from 'src/common/constants/exceptions/HandlerException';
import { getTodoPagination } from './funcs';
import { DATABASE_EXIT_CODE } from 'src/common/enums/error-code.enum';
import { ErrorMessage } from './constants/enums/error-message.enum';
import { returnObjects } from 'src/utils/response';
import { BaseErrorMassage } from 'src/common/enums/error-message.enum';
import { Public } from 'src/common/decorator/public.decorator';

@ApiTags('todo')
@Controller('todo')
export class TodoController {
    constructor(
        private readonly todoService: TodoService,
    ) { }
    @ApiOperation({ summary: 'todo hello' })
    @Public()
    @Get('hello')
    async getHello(): Promise<string> {
        return 'Hello, wellcome to todo page !';
    }


    @ApiOperation({ summary: 'Get todo pagination for admin' })
    @Roles(Role.ADMIN)
    @Get()
    async getTodoPagination(@Req() req: Request, @Query() query: GetPaginationDto) {
        try {
            const todos = await getTodoPagination(query, this.todoService, req);
            if (todos instanceof HandlerException) {
                throw todos;
            }
            return todos;
        } catch (e) {
            return catchErrController(req, e);
        }
    }




    @ApiOperation({ summary: 'Create todo for user' })
    @Roles(Role.USER)
    @HttpCode(HttpStatus.CREATED)
    @Post('create')
    async create(@Req() req: Request, @Body() createdTodoDto: CreatedTodoDto) {
        try {
            const { title, description, dueTime, priority, status, userId } = createdTodoDto;
            let newTodo = new TodoEntity();
            newTodo.title = title;
            newTodo.description = description;
            newTodo.dueTime = dueTime;
            newTodo.priority = priority;
            newTodo.status = status;

            newTodo.userId = userId;
            newTodo.createdBy = req['user'].id;
            newTodo.createdAt = new Date();

            newTodo = await this.todoService.saveTodo(newTodo);
            if (!newTodo) {
                throw new HandlerException(
                    DATABASE_EXIT_CODE.NO_CONTENT,
                    req.url,
                    ErrorMessage.CREATE_FAILED,
                );
            }
            return returnObjects({ id: newTodo.id });

        } catch (e) {
            return catchErrController(req, e);
        }
    }

    @ApiOperation({ summary: 'Get todo by id' })
    @Roles(Role.USER)
    @Get(':id')
    async getTodoById(@Req() req: Request) {
        try {
            const id = parseInt(req.params.id);
            const todo = await this.todoService.getTodoById(id);
            if (!todo) {
                throw new HandlerException(
                    DATABASE_EXIT_CODE.NO_CONTENT,
                    req.url,
                    BaseErrorMassage.NO_CONTENT,
                );
            }
            return returnObjects(todo);
        } catch (e) {
            return catchErrController(req, e);
        }
    }

    @ApiOperation({ summary: 'update todo by id' })
    @Roles(Role.USER)
    @Put(':id')
    async updateTodoById(@Req() req: Request, @Body() todo: CreatedTodoDto) {
        try {
            const id = parseInt(req.params.id);
            const { title, description, dueTime, priority, status, userId } = todo;

            let todoUpdate = await this.todoService.getTodoById(id);
            if (!todoUpdate) {
                throw new HandlerException(
                    DATABASE_EXIT_CODE.NO_CONTENT,
                    req.url,
                    BaseErrorMassage.NO_CONTENT,
                );
            }
            todoUpdate.title = title;
            todoUpdate.description = description;
            todoUpdate.dueTime = dueTime;
            todoUpdate.priority = priority;
            todoUpdate.status = status;
            todoUpdate.userId = userId;
            todoUpdate.updatedBy = req['user'].id;
            todoUpdate.updatedAt = new Date();

            todoUpdate = await this.todoService.saveTodo(todoUpdate);
            if (!todoUpdate) {
                throw new HandlerException(
                    DATABASE_EXIT_CODE.NO_CONTENT,
                    req.url,
                    ErrorMessage.UPDATE_FAILED,
                );
            }
            return returnObjects({ id: todoUpdate.id });
        } catch (e) {
            return catchErrController(req, e);
        }
    }
    @ApiOperation({ summary: 'Delete todo by id' })
    @Roles(Role.USER)
    @Delete(':id')
    async delete(@Req() req: Request) {
        try {
            const id = parseInt(req.params.id);
            let todo = await this.todoService.getTodoById(id);
            if (!todo) {
                throw new HandlerException(
                    DATABASE_EXIT_CODE.NO_CONTENT,
                    req.url,
                    BaseErrorMassage.NO_CONTENT,
                );
            }
            todo.deletedBy = req['user'].id;
            todo.deletedAt = new Date();
            todo.deleted = true;

            const result = await this.todoService.saveTodo(todo);

            if (!result) {
                throw new HandlerException(
                    DATABASE_EXIT_CODE.NO_CONTENT,
                    req.url,
                    ErrorMessage.UPDATE_FAILED,
                );
            }
            return returnObjects({ id: todo.id });

        } catch (e) {
            return catchErrController(req, e);
        }
    }


}
