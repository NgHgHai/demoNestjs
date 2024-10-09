import { Controller, Get, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/common/decorator/public.decorator';
import { ApiOperation } from '@nestjs/swagger';
import { returnObjects } from 'src/utils/response';
import { catchErrController } from 'src/utils/error.util';
import { Request } from 'express';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) { }






  @Public()
  @ApiOperation({ summary: 'Upload file' })
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    try {
      const { originalname, filename, destination } = file;

      console.log('destination', destination);
      console.log('file: ', file);
      console.log('originalname: ', originalname);
      console.log('filename: ', filename);
      // console.log('=========end_controller=============');
      const data = await this.uploadsService.readExcelFile(file);

      return returnObjects(data);
    } catch (error) {
      catchErrController(error, req);
    }
  }
}
