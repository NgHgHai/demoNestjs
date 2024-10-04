import { Catch, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { TodoEntity } from 'src/common/entities/todo.entity';
import { Repository } from 'typeorm';
import { GetPaginationDto } from './dtos/get-pagination.dto';
import { catchErrService } from 'src/utils/error.util';
import { HandlerException } from 'src/common/constants/exceptions/HandlerException';
import { error } from 'console';

@Injectable()
export class TodoService {
    async count(): Promise<number | null> {
        try {
            const count = await this.todoRepository
                .createQueryBuilder()
                .where('deleted = false')
                .getCount();

        } catch (e) {
            catchErrService('TodoService.count', e);
            return null;
        }
    }
    async getTodoPagination(param: GetPaginationDto): Promise<TodoEntity[]> {
        try {
            const { page, limit } = param;
            const todos = await this.todoRepository
                .createQueryBuilder()
                .where('deleted = false')
                .skip((page - 1) * limit)
                .take(limit)
                .orderBy('createdAt', 'DESC')
                .getMany();
            return todos;
        } catch (e) {
            catchErrService('TodoService.getTodoPagination', e);
            return null;
        }
    }

    constructor(
        @InjectRepository(TodoEntity)
        private readonly todoRepository: Repository<TodoEntity>,
    ) { }



    async getTodoById(id: number): Promise<TodoEntity> {
        try {
            const todo = await this.todoRepository.findOne({
                where: {
                    id,
                    deleted: false,
                },
            })
            return todo;
        } catch (e) {
            catchErrService('TodoService.getTodoById', e);
            return null;
        }
    }
    async saveTodo(todo: TodoEntity): Promise<TodoEntity> {
        try {
            const newTodo = await this.todoRepository.save(todo);
            return newTodo;
        } catch (e) {
            catchErrService('TodoService.saveTodo', e);
            return null;
        }
    }

    async delete(id: number, deletedBy: string): Promise<boolean> {
        try {
            const todo = await this.todoRepository.update(
                { id, deleted: false, },
                { deleted: true }
            );

            return true;
        } catch (e) {
            catchErrService('TodoService.delete', e);
            return false;
        }
    }

    // async getTodoByUserId(userId: number): Promise<TodoEntity[]> {
    //     return await this.todoRepository.find({ where: { userId } });
    // }

}
