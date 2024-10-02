import { IsString, IsOptional, IsBoolean, IsInt } from 'class-validator';

export class UpdateUserDto {
    id: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString({ message: 'must string' })
    password?: string;

    @IsOptional()
    @IsString({ message: 'must string' })
    oldPass?: string;

    @IsOptional()
    @IsBoolean({ message: 'must boolean' })
    isActive?: boolean;

    @IsOptional()
    @IsBoolean({message: 'must boolean'})
    isVerified?: boolean;

    @IsOptional()
    @IsInt({message: 'must number 0:admin, 1:user'})
    role?: number;
}