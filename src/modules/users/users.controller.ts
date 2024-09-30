import { Controller, Get, HttpCode, HttpStatus, UseGuards, Request, Put, Body, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from 'src/common/entities/user.entity';
import { UpdateUserDto } from './dtos/updateDto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import * as bcrypt from 'bcrypt';
import { error } from 'console';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) { }
    @HttpCode(HttpStatus.OK)
    @Get('info')
    async getUsers(@Request() req): Promise<UserEntity> {
        return this.usersService.getUserById(req.user.ssid);
    }
    @HttpCode(HttpStatus.OK)
    @Put('update')
    async updateUser(@Request() req, @Body() updateUserDto: UpdateUserDto): Promise<UserEntity> {
        const user = req.user;
        user.username = updateUserDto.name;
        user.password = updateUserDto.password;
        return this.usersService.updateUser(req.user.ssid, user, req.user.ssid);
    }
    @HttpCode(HttpStatus.OK)
    @Put('changePass')
    async changePassword(@Request() req, @Body() updateDto: UpdateUserDto): Promise<UserEntity> {
        if (!updateDto.oldpass || !updateDto.password) {
            throw new Error('Old password and new password are required');
        }

        const user = await this.usersService.getUserById(req.ssid);
        const isMatch = bcrypt.compare(updateDto.oldpass, user.password)
        try {
            if (isMatch) {
                user.password = updateDto.password;
                return this.usersService.updateUser(req.ssid, user, req.ssid);
            } else {
                throw new Error('Old password is incorrect');
            }
        } catch (e) {
            throw new error(e);
        }
    }
    @HttpCode(HttpStatus.OK)
    @Delete('delete')
    async deleteUser(@Request() req): Promise<UserEntity> {
        return this.usersService.optionDeleteUser(req.user.ssid, true, req.user.ssid);
    }




}
