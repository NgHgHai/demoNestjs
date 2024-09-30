import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/loginDto';
import { RegisterDto } from './dtos/registerDto';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AuthGuard } from 'src/common/guards/auth.guard';

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
    async adminLogin(@Request() req): Promise<any> {
        console.log('day la admin');
        return req.user;
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    async register(@Body() registerDto: RegisterDto): Promise<any> {
        console.log(registerDto);
        const user = await this.authService.register(registerDto);
        console.log(user.role);
        return user.role;
    }


}
