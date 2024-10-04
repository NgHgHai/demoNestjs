import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/registerDto';
import { catchErrController } from 'src/utils/error.util';
import { Request } from '@nestjs/common';
import { DATABASE_EXIT_CODE } from 'src/common/enums/error-code.enum';
import { Public } from 'src/common/decorator/public.decorator';
import { HandlerException } from 'src/common/constants/exceptions/HandlerException';
import { ErrorMessage } from './enums/error-message.enum';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ILoginResponse } from './interfaces';
import { returnObjects } from 'src/utils/response';
import { SALT } from 'src/common/constants';
import { UserEntity } from 'src/common/entities/user.entity';
import { Role } from 'src/common/enums/role.enum';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService,
    ) { }
    @ApiOperation({ summary: 'Get hello' })
    @Public()
    @Get()
    async getHello(): Promise<string> {
        return 'Hello, wellcome to login page !';
    }

    @ApiOperation({ summary: 'Login' })
    @HttpCode(HttpStatus.OK)
    @Public()
    @Post('login')
    async login(@Req() req: Request, @Body() loginDto: LoginDto) {
        try {
            const user = await this.authService.getUserByEmail(loginDto.email);
            if (!user) {
                throw new HandlerException(DATABASE_EXIT_CODE.NO_CONTENT,
                    req.url,
                    ErrorMessage.USER_NOT_FOUND,
                );
            }

            const isMatch = await bcrypt.compare(loginDto.password, user.password);

            if (!isMatch) {
                throw new HandlerException(DATABASE_EXIT_CODE.NO_CONTENT,
                    req.url,
                    ErrorMessage.INVALID_PASSWORD,
                );
            }
            // create jwt token
            const payload = { email: user.email, id: user.id, role: user.role, username: user.username };
            const accessToken = await this.jwtService.signAsync(payload);

            const response: ILoginResponse = {
                id: user.id,
                access_token: accessToken,

            }

            return returnObjects(response);

        } catch (e) {
            catchErrController(req, e);
        }
    }
    @ApiOperation({ summary: 'Register' })
    @Public()
    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    async register(@Body() registerDto: RegisterDto, @Req() req: Request) {
        try {
            const { email, password } = registerDto;
            const user = await this.authService.getUserByEmail(email);
            if (user) {
                throw new HandlerException(DATABASE_EXIT_CODE.UNIQUE_FIELD_VALUE,
                    req.url,
                    ErrorMessage.USER_ALREADY_EXISTS,
                );
            }

            const hashPassword = await bcrypt.hash(password, SALT);
            let newUser = new UserEntity();
            newUser.email = email;
            newUser.password = hashPassword;
            newUser.role = Role.USER;

            newUser = await this.authService.save(newUser);

            if (!newUser) {
                throw new HandlerException(DATABASE_EXIT_CODE.OPERATOR_ERROR,
                    req.url,
                    ErrorMessage.CREATE_USER_FAILED,
                );
            }

            const payload = { email: newUser.email, id: newUser.id, role: newUser.role, username: newUser.username };
            const accessToken = await this.jwtService.signAsync(payload);

            const response: ILoginResponse = {
                id: newUser.id,
                access_token: accessToken,
            }

            return returnObjects(response);
        } catch (e) {
            catchErrController(req, e);
        }
    }


}
