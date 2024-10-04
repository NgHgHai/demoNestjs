import { ApiProperty } from '@nestjs/swagger';
import { generateValidationMessage } from 'src/utils'; 
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { MinValidator } from 'src/common/validators/min.validator';

export class GetPaginationDto {
  @ApiProperty({
    description: 'Trang hiện tại',
    required: false,
    default: 1,
  })
  @IsNotEmpty({
    message: (args) =>
      generateValidationMessage(args, 'Trang hiện tại không được để trống'),
  })
  @MinValidator(1, {
    message: (args) =>
      generateValidationMessage(
        args,
        'Trang hiện tại phải lớn hơn hoặc bằng 1',
      ),
  })
  @Transform(({ value }) => parseInt(value))
  page: number;

  @ApiProperty({
    description: 'Số lượng bản ghi trên mỗi trang',
    required: false,
    default: 10,
  })
  @IsNotEmpty({
    message: (args) =>
      generateValidationMessage(
        args,
        'Số lượng bản ghi trên mỗi trang không được để trống',
      ),
  })
  @MinValidator(1, {
    message: (args) =>
      generateValidationMessage(
        args,
        'Số lượng bản ghi trên mỗi trang phải lớn hơn hoặc bằng 1',
      ),
  })
  @Transform(({ value }) => parseInt(value))
  limit: number;
}
