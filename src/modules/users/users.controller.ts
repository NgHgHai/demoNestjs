import { Controller, Get, HttpCode, HttpStatus, Put, Body, Delete, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/updateDto';
import * as bcrypt from 'bcrypt';
import { Public } from 'src/common/decorator/public.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { HandlerException } from 'src/common/constants/exceptions/HandlerException';
import { BaseErrorMassage } from 'src/common/enums/error-message.enum';
import { DATABASE_EXIT_CODE } from 'src/common/enums/error-code.enum';
import { returnObjects } from 'src/utils/response';
import { ErrorMessage } from './enums/error-message.enum';
import { SALT } from 'src/common/constants';
import { catchErrController } from 'src/utils/error.util';
import { Request } from 'express';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) { }

    @ApiOperation({ summary: 'Get hello' })
    @Public()
    @Get('hello')
    @HttpCode(HttpStatus.OK)
    async getHello(): Promise<string> {
        return 'Hello, wellcome to login page !';
    }

    @ApiOperation({ summary: 'Get user info' })
    @HttpCode(HttpStatus.OK)
    @Get('info')
    @Roles(Role.USER)
    async getUsers(req: Request) {

        const user = await this.usersService.getUserById(req['user'].id);

        if (!user) {
            throw new HandlerException(
                DATABASE_EXIT_CODE.NO_CONTENT,
                req.url,
                BaseErrorMassage.NO_CONTENT,
            )
        }

        user.password = undefined;
        return returnObjects(user);
    }

    @ApiOperation({ summary: 'Update user' })
    @HttpCode(HttpStatus.OK)
    @Put('update')
    async updateUser(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
        const userId = req['user'].id;
        let user = await this.usersService.getUserById(userId);
        if (!user) {
            throw new HandlerException(
                DATABASE_EXIT_CODE.NO_CONTENT,
                req.url,
                BaseErrorMassage.NO_CONTENT,
            )
        }
        const { name, isActive, isVerified, role } = updateUserDto;
        user.username = name ?? user.username;
        user.isActive = isActive ?? user.isActive;
        user.isVerified = isVerified ?? user.isVerified;
        user.role = role ?? user.role;

        const updated = await this.usersService.updateUser(user);
        if (!updated) {
            throw new HandlerException(
                DATABASE_EXIT_CODE.NO_CONTENT,
                req.url,
                ErrorMessage.UPDATE_FAILED,
            );
        }
        return returnObjects({ id: user.id });
    }

    @ApiOperation({ summary: 'Change password' })
    @HttpCode(HttpStatus.OK)
    @Put('changePass')
    @Roles(Role.USER)
    async changePassword(req: Request, @Body() updateDto: UpdateUserDto) {
        if (!updateDto.oldPass || !updateDto.password) {
            throw new HandlerException(
                DATABASE_EXIT_CODE.NO_CONTENT,
                req.url,
                ErrorMessage.MISSING_PASSWORD,
            );
        }

        const user = await this.usersService.getUserById(req['user'].id);
        if (!user) {
            throw new HandlerException(
                DATABASE_EXIT_CODE.NO_CONTENT,
                req.url,
                BaseErrorMassage.NO_CONTENT,
            )
        }

        const isMatch = await bcrypt.compare(updateDto.oldPass, user.password);

        try {
            if (isMatch) {
                user.password = await bcrypt.hash(updateDto.password, SALT);
                const result = await this.usersService.updateUser(user);
                if (!result) {
                    throw new HandlerException(
                        DATABASE_EXIT_CODE.NO_CONTENT,
                        req.url,
                        ErrorMessage.UPDATE_FAILED,
                    );
                }
                return returnObjects({ result: result });
            } else {
                throw new HandlerException(
                    DATABASE_EXIT_CODE.UNAUTHORIZE,
                    req.url,
                    ErrorMessage.PASSWORD_NOT_CORRECT,
                );
            }
        } catch (e) {
            catchErrController(req, e);
        }
    }


    @ApiOperation({ summary: 'Delete user' })
    @HttpCode(HttpStatus.OK)
    @Roles(Role.USER)
    @Delete('delete')
    async deleteUser(req: Request) {
        const userId = req['user'].id;
        const user = await this.usersService.getUserById(userId);
        if (!user) {
            throw new HandlerException(
                DATABASE_EXIT_CODE.NO_CONTENT,
                req.url,
                BaseErrorMassage.NO_CONTENT,
            );
        }
        user.deleted = true;
        user.deletedAt = new Date();
        user.deletedBy = userId;
        const result = await this.usersService.updateUser(user);
        if (!result) {
            throw new HandlerException(
                DATABASE_EXIT_CODE.NO_CONTENT,
                req.url,
                ErrorMessage.UPDATE_FAILED,
            );
        }
        return returnObjects({ id: user.id });
    }




}
