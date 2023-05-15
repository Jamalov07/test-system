import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { StuffsService } from './stuffs.service';
import { CreateStuffDto } from './dto/create-stuff.dto';
import { UpdateStuffDto } from './dto/update-stuff.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('stuffs')
export class StuffsController {
  constructor(private readonly stuffsService: StuffsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createStuffDto: CreateStuffDto, @UploadedFile() image: any) {
    return this.stuffsService.create(createStuffDto, image);
  }

  @Get()
  findAll() {
    return this.stuffsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stuffsService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: string,
    @Body() updateStuffDto: UpdateStuffDto,
    @UploadedFile() image: any,
  ) {
    return this.stuffsService.update(+id, updateStuffDto,image);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stuffsService.remove(+id);
  }
}
