import { IsEmail, MaxLength, MinLength } from "class-validator";

export class LoginDto {
    @IsEmail({}, { message: 'Email is not valid' })
    email: string;


    @MinLength(5, { message: 'Password is too short' })
    @MaxLength(50, { message: 'Password is too long' })
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}