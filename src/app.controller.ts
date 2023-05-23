import {
    Controller,
    Get,
    Header,
    Post,
    Query,
    Redirect,
    Req,
    Res,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
  import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
  
  @Controller()
  @ApiTags('file-upload')
  export class AppController {
    constructor(private readonly appService: AppService) {}
    
    @UseInterceptors(FileInterceptor('image'))
    @Post('file-upload')
    createFile(@UploadedFile() image: string) {
        return this.appService.fileUploadService(image);
    }
    @Get('api/v1/docs')
    @Redirect(`${process.env.BASE_URL}/docs`, 302)
    getDocs(@Query('version') version: string) {
      if (version && version === '5') {
        return { url: 'https://docs.nestjs.com/v5/' };
      }
    }

}
