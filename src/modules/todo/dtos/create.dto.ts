import { TodoEntity } from "src/common/entities/todo.entity"
import { IsInt, IsNotEmpty, IsOptional, IsString, IsDate } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { generateValidationMessage } from "src/utils";
import { LengthValidator } from "src/common/validators/length.validator";
import { Transform } from "class-transformer";
import { DateValidator } from "src/common/validators/date.validator";


export class CreatedTodoDto {
    @ApiProperty({
        description: 'Title',
        example: 'connection do db',
    })
    @IsNotEmpty({
        message: (args) =>
            generateValidationMessage(args, 'cannot be empty'),
    })
    @LengthValidator(1, 255, {
        message: (args) =>
            generateValidationMessage(args, 'must be between 1 and 255 characters'),
    })
    @Transform(({ value }) => value.trim())
    title: string;

    @ApiProperty({
        description: 'Description',
        example: 'connection do db type:mySQl,  host:localhost , port:3306, username:Todo, password:34@ssaZaswDJA',
    })
    @IsOptional()
    @Transform(({ value }) => value.trim())
    @LengthValidator(1, 500, {
        message: (args) =>
            generateValidationMessage(args, 'must be between 1 and 500 characters'),
    })
    description: string;
    @ApiProperty({
        description: 'date must complete',
        example: '2021-09-02',
    })
    @IsNotEmpty({
        message: (args) =>
            generateValidationMessage(args, 'Due time cannot be empty'),
    })
    @DateValidator({
        message: (args) =>
            generateValidationMessage(args, 'must be a valid date'),
    })
    dueTime: Date;

    @ApiProperty({
        description: 'Status: 1: todo, 2: doing, 3: done, 4: cancel',
        example: '1',
    })
    @IsInt({
        message: (args) =>
            generateValidationMessage(args, 'must be an integer'),
    })
    @IsNotEmpty({
        message: (args) =>
            generateValidationMessage(args, 'status cannot be empty'),
    })
    status: number;

    @ApiProperty({
        description: 'Priority: 1: high, 2: medium, 3: low',
        example: '1',
    })
    @IsInt({
        message: (args) =>
            generateValidationMessage(args, 'must be an integer'),
    })
    @IsNotEmpty({
        message: (args) =>
            generateValidationMessage(args, 'priority cannot be empty'),
    })
    priority: number;

    @ApiProperty({
        description: 'User ID',
        example: '1',
    })
    @IsOptional()
    userId: number;
}
