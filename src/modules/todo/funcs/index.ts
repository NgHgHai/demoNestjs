import { HandlerException } from 'src/common/constants/exceptions/HandlerException'; 
import { returnObjectsWithPaging } from 'src/utils/response'; 
import { Request } from 'express';

import { GetPaginationDto } from '../dtos/get-pagination.dto';
import { ITodoResponse } from '../interfaces/ITodoResponse.interface'; 
import { TodoService } from '../todo.service'; 

import { DATABASE_EXIT_CODE } from 'src/common/enums/error-code.enum'; 
import { BaseErrorMassage } from 'src/common/enums/error-message.enum'; 

export const getTodoPagination = async (
  param: GetPaginationDto,
  todoService: TodoService,
  req: Request,
) => {
  const [todos, count] = await Promise.all([
    todoService.getTodoPagination(param),
    todoService.count(),
  ]);

  if (!todos?.length || !count) {
    return new HandlerException(
      DATABASE_EXIT_CODE.NO_CONTENT,
      req.url,
      BaseErrorMassage.NO_CONTENT,
    );
  }

  const totalPage = Math.ceil(count / param.limit);

  const todosFormatted = todos.map((todo) => {
    return <ITodoResponse>{
      id: todo.id,
      title: todo.title,
      description: todo.description,
      dueTime: todo.dueTime,
      priority: todo.priority,
      status: todo.status,
      userId: todo.userId,
      createdBy: todo.createdBy,
      createdAt: todo.createdAt,
    };
  });

  return returnObjectsWithPaging(count, totalPage, param.page, todosFormatted);
};
