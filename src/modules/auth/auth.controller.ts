import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/loginDto';
import { RegisterDto } from './dtos/registerDto';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AuthGuard } from 'src/common/guards/auth.guard';

//TODO: Nếu mục đích phân quyền của e chỉ ở auth controller thì oke, còn nếu muốn phân quyền ở tất cả các controller thì e cần phải sửa lại ở không thể làm như này có nhiều controller khác nhau đc
@UseGuards(RolesGuard)
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }
    @Get()
    async getHello(): Promise<string> {
        return 'Hello, wellcome to login page !';
    }
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<any> {
        console.log(loginDto);
        return this.authService.login(loginDto.email, loginDto.password);
    }
    
    @HttpCode(HttpStatus.OK)
    @Get('admin')
    @Roles(Role.Admin)
    // @UseGuards(AuthGuard)
    //TODO: typescript sao để req là any dị -> req: Request
    async adminLogin(@Request() req): Promise<any> {
        console.log('day la admin');
        return req.user;
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    //TODO: nếu e return về any thì thôi xoá lun cái Promise<any> đi e
    async register(@Body() registerDto: RegisterDto): Promise<any> {
        console.log(registerDto);
        const user = await this.authService.register(registerDto);
        console.log(user.role);
        return user.role;
    }


}
