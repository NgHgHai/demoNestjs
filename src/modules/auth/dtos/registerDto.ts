import { IsEmail, Matches } from "class-validator";
import { IsString, MinLength } from "class-validator";
import { PASSWORD_REGEX } from "src/common/constants";

export class RegisterDto {
    @IsString({ message: 'Username is not valid' })
    @MinLength(4, { message: 'Username is too short' })
    @MinLength(50, { message: 'Username is too long' })
    username: string;

    // @Matches(PASSWORD_REGEX, { message: 'must have atlease 8, UpCase,LowCase,number' })
    @MinLength(6)
    password: string;

    @IsEmail({}, { message: 'Email is not valid' })
    email: string;
 constructor(username: string, password: string, email: string) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

}