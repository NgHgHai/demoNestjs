import { Injectable, Req } from '@nestjs/common';
import { catchErrService } from 'src/utils/error.util';
import * as ExcelJS from 'exceljs';
import { Request } from 'express';
import { TodoDto } from './dtos/todo.dto';
import { TodoEntity } from 'src/common/entities/todo.entity';
import { TodoService } from '../todo/todo.service';
import { UsersService } from '../users/users.service';
import { UserEntity } from 'src/common/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { SALT } from 'src/common/constants';
import { returnObjects } from 'src/utils/response';
const fs = require('fs');
const path = require('path');

@Injectable()
export class UploadsService {
    constructor(
        private readonly todoService: TodoService,
        private readonly userService: UsersService
    ) { }

    async readExcelFile(file: Express.Multer.File) {
        try {
            const start = performance.now();

            const { originalname, filename, destination } = file;

            const workbook = new ExcelJS.Workbook();
            console.log('dirname:', __dirname);
            console.log('part:', path.join(__dirname, `../../../uploads/${filename}`));
            await workbook.xlsx.readFile(path.join(__dirname, `../../../uploads/${filename}`));
            const worksheet = workbook.getWorksheet(1);
            const data = [];
            let count = 0;

            await worksheet.eachRow(async (row, rowNumber) => {
                if (rowNumber === 1) {
                    return;
                } const rowData = row.values; // Lấy dữ liệu của từng dòng
                data.push(rowData); // Đẩy dữ liệu vào mảng
                // console.log('rowData:', rowData[1].result);
                let user = await this.userService.getUserByEmail(rowData[1].result.toString());
                if (!user) {// neu chua co user thi tao moi voi password mac dinh la '12345678'
                    // console.log('chua co user:============.',)

                    console.log('chua co user, tao moi user thu :', count++);
                    const newUser = new UserEntity();
                    newUser.email = rowData[1].result.toString();
                    newUser.password = await bcrypt.hash('12345678', SALT);
                    newUser.createdAt = new Date();
                    newUser.createdBy = 'system <= import.xlsx';
                    user = await this.userService.saveUser(newUser);
                }

                const todoEntity = new TodoEntity();
                todoEntity.title = rowData[2].toString();
                todoEntity.description = rowData[3].toString();
                todoEntity.status = parseInt(rowData[4]);
                todoEntity.priority = parseInt(rowData[5]);
                todoEntity.dueTime = rowData[6];
                todoEntity.createdAt = new Date();
                todoEntity.createdBy = 'import.xlsx';
                todoEntity.userId = user.id;

                // console.log('todoEntity:', todoEntity);
                const todo = await this.todoService.saveTodo(todoEntity);
                console.log(start - performance.now(), 'ms', 'rowNumber:', rowNumber, 'count:', count);

            });
            const end = performance.now();
            const time = end - start;
            console.log('TimeProcess:', end - start, 'ms');
            console.log('worksheet.rowCount:', worksheet.rowCount);
            console.log('add user:', count);
            return returnObjects({ time, "rownumber": worksheet.rowCount - 1, "count account created: ": count });

        } catch (error) {
            console.log('error:', error);
            catchErrService('UploadsService.readExcelFile', error);
        }
    }
}

// } catch (error) {
//     console.log('error:', error);
//     catchErrService('UploadsService.readExcelFile', error);
// }
// }

// }
