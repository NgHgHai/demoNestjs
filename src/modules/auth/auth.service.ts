import { Catch, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dtos/registerDto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { catchErrService } from 'src/utils/error.util';
import { AUTHENTICATION_EXIT_CODE } from 'src/common/enums/error-code.enum';


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }
    async login(email: string, pass: string): Promise<{ access_token: String } | any > {
        const user = await this.usersService.getUserByEmail(email);
        if (!user) {
            catchErrService('auth/login', 'User not found');
            return AUTHENTICATION_EXIT_CODE.USER_NOT_FOUND;
        }
        // console
        console.log(user);

        const isMatch = await bcrypt.compare(pass, user.password);
        if (!isMatch) {
            catchErrService('auth/login', 'Password is not correct');
            return AUTHENTICATION_EXIT_CODE.PASSWORD_NOT_CORRECT;
        }
        // generate token
        const payload = { email: user.email, ssid: user.id, role: user.role, username: user.username };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(registerDto: RegisterDto): Promise<any> {
        const user = await this.usersService.getUserByEmail(registerDto.email);
        if (user) {
            throw new UnauthorizedException();
        } else {
            return this.usersService.createUser(registerDto);
        }

    }
}
