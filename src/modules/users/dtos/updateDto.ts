import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsBoolean, IsInt } from 'class-validator';
import { LengthValidator } from 'src/common/validators/length.validator';

export class UpdateUserDto {
    id: string;

    @IsOptional()
    @LengthValidator(1, 255, {
        message: (args) =>
            `must be between 1 and 255 characters`,
    })
    name?: string;
    @ApiProperty({
        description: 'password must be required when update password, uses to update password',
        example: '123456'
    })
    @IsOptional()
    password?: string;


    @ApiProperty({
        description: 'old password, must be required when update password, uses to check old password',
        example: '123456',
    })
    @IsOptional()
    oldPass?: string;

    @ApiProperty({
        description: 'isActive: true or false',
        example: 'true'
    })
    @IsOptional()
    @IsBoolean({ message: 'must boolean' })
    isActive?: boolean;

    @ApiProperty({
        description: 'isVerified: true or false',
        example: 'true'
    })
    @IsOptional()
    @IsBoolean({ message: 'must boolean' })
    isVerified?: boolean;

    @ApiProperty({
        description: 'role: 0:admin, 1:user',
        example: '1'
    })
    @IsOptional()
    @IsInt({ message: 'must number 0:admin, 1:user' })
    role?: number;
}