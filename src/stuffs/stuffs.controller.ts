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
import { Roles } from '../decorators/roles.decorator';
import { PermissionRoles } from '../decorators/roles_org.decorator';

@Controller('stuffs')
export class StuffsController {
  constructor(private readonly stuffsService: StuffsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createStuffDto: CreateStuffDto,
    @UploadedFile() image: any,
    @Roles(['SUPERADMIN', 'ADMIN']) command: string,
  ) {
    return this.stuffsService.create(createStuffDto, image, command);
  }

  @Get()
  findAll(@PermissionRoles(['SUPERADMIN', 'ADMIN']) str: string) {
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
    return this.stuffsService.update(+id, updateStuffDto, image);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stuffsService.remove(+id);
  }
}
