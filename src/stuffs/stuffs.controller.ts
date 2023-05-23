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
  create(
    @Body() createStuffDto: CreateStuffDto,
  ) {
    return this.stuffsService.create(createStuffDto);
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
  update(
    @Param('id') id: string,
    @Body() updateStuffDto: UpdateStuffDto,
  ) {
    return this.stuffsService.update(+id, updateStuffDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stuffsService.remove(+id);
  }
}
