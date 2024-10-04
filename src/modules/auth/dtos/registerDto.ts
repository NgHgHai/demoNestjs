import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, Matches } from "class-validator";
import { PASSWORD_REGEX } from "src/common/constants";
import { LengthValidator } from "src/common/validators/length.validator";
import { generateValidationMessage } from "src/utils";

export class RegisterDto {
    // @ApiProperty({
    //     description: 'username',
    //     example: 'admin',
    // })
    // @IsNotEmpty({
    //     message: (args) =>
    //         generateValidationMessage(args, 'username cannot be empty'),
    // })
    // @LengthValidator(1, 255, {
    //     message: (args) =>
    //         generateValidationMessage(
    //             args,
    //             'Tên đăng nhập phải có độ dài từ 1 đến 255 ký tự',
    //         ),
    // })
    // @Transform(({ value }) => value.trim())
    // username: string;

    // @Matches(PASSWORD_REGEX, { message: 'must have atlease 8, UpCase,LowCase,number' })
    @ApiProperty({
        description: 'password',
        example: 'Admin@123',
    })
    @IsNotEmpty({
        message: (args) =>
            generateValidationMessage(args, 'password cannot be empty'),
    })
    @LengthValidator(8, 255, {
        message: (args) =>
            generateValidationMessage(
                args,
                'Mật khẩu phải có độ dài từ 8 đến 255 ký tự',
            ),
    })
    password: string;

    @IsEmail({}, {
        message:
            (args) =>
                generateValidationMessage(args, 'must be a valid email address'),
    })
    @ApiProperty({
        description: 'email',
        example: 'admin@gmail.com',
    })
    @IsNotEmpty({
        message: (args) =>
            generateValidationMessage(args, 'email cannot be empty'),
    })
    @Transform(({ value }) => value.trim())
    email: string;

}

