import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from 'src/common/entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(TodoEntity)
        private readonly todoRepository: Repository<TodoEntity>,
    ) { }

    async create(todo: TodoEntity, createby: string): Promise<TodoEntity> {
        todo.createdAt = new Date();
        todo.createdBy = createby;
        return await this.todoRepository.save(todo);
    }
    async getAll(): Promise<TodoEntity[]> {
        return await this.todoRepository.find();
    }
    async getById(id: number): Promise<TodoEntity> {
        return await this.todoRepository.findOneBy({ id });
    }
    async update(id: number, todo: TodoEntity, updateBy: string): Promise<TodoEntity> {
        todo.updatedAt = new Date();
        todo.updatedBy = updateBy;
        await this.todoRepository.update(id, todo);
        return await this.todoRepository.findOneBy({ id });
    }
    async delete(id: number, deletedBy: string): Promise<TodoEntity> {
        const todo = await this.todoRepository.findOneBy({ id });
        todo.deleted = true;
        todo.deletedAt = new Date();
        todo.deletedBy = deletedBy;
        await this.todoRepository.update(id, todo);
        return todo;
    }
    async getTodoByUserId(userId: number): Promise<TodoEntity[]> {
        return await this.todoRepository.find({ where: { userId } });
    }

}
