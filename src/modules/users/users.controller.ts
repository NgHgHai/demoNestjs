import { Controller, Get, HttpCode, HttpStatus, UseGuards, Request, Put, Body, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from 'src/common/entities/user.entity';
import { UpdateUserDto } from './dtos/updateDto';
import * as bcrypt from 'bcrypt';


@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) { }
    @HttpCode(HttpStatus.OK)
    @Get('info')
    async getUsers(@Request() req): Promise<UserEntity> {
        const user = await this.usersService.getUserById(req.user.ssid);
        user.password = undefined;
        return user;
    }
    @HttpCode(HttpStatus.OK)
    @Put('update')
    async updateUser(@Request() req, @Body() updateUserDto: UpdateUserDto): Promise<UserEntity> {
        const user = req.user;
        user.username = updateUserDto.name;
        // user.password = updateUserDto.password;
        this.usersService.updateUser(req.user.ssid, user);
        return user;
    }
    @HttpCode(HttpStatus.OK)
    @Put('changePass')
    async changePassword(@Request() req, @Body() updateDto: UpdateUserDto): Promise<UserEntity> {
        if (!updateDto.oldPass || !updateDto.password) {
            //TODO: e nên trả về một message lỗi chứ không phải throw error
            throw new Error('Old password and new password are required');
        }
    
        const user = await this.usersService.getUserById(req.ssid);
        if (!user) {
            throw new Error('User not found');
        }
        const isMatch = await bcrypt.compare(updateDto.oldPass, user.password);
        try {
            if (isMatch) {
                user.password = await bcrypt.hash(updateDto.password, 10);
                console.log(user,"vo dung cho r ne");
                await this.usersService.updateUser(user, user.id + '');
                return user;
            } else {
                throw new Error('Old password is incorrect');
            }
        } catch (e) {
            throw new Error(e.message);
        }
    }
    @HttpCode(HttpStatus.OK)
    @Delete('delete')
    async deleteUser(@Request() req): Promise<UserEntity> {
        return this.usersService.optionDeleteUser(req.user.ssid, true, req.user.ssid);
    }




}
