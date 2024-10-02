import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/loginDto';
import { RegisterDto } from './dtos/registerDto';
import { PublicResourceGuard } from 'src/common/guards/publicResource.guard';
import { catchErrController } from 'src/utils/error.util';
import { Request } from '@nestjs/common';
import { AUTHENTICATION_EXIT_CODE } from 'src/common/enums/error-code.enum';
import { error } from 'console';

@UseGuards(PublicResourceGuard)
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
    async login(@Req() req: Request ,@Body() loginDto: LoginDto): Promise<any> {
        let response = null;
        const result = await this.authService.login(loginDto.email, loginDto.password);
        if (result === AUTHENTICATION_EXIT_CODE.USER_NOT_FOUND || result === AUTHENTICATION_EXIT_CODE.PASSWORD_NOT_CORRECT) {
             response ={
                errorCode: result,
                message: result === AUTHENTICATION_EXIT_CODE.USER_NOT_FOUND ? 'User not found' : 'Password not correct',
            }
            catchErrController(new HttpException(response,401), req);
        } 
        return result;
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        console.log(registerDto);
        
        const user = await this.authService.register(registerDto);
        console.log(user.role);
        return user.role;
    }


}
