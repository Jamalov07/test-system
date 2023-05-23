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
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Subject } from './entities/subject.entity';

@ApiBearerAuth()
@ApiTags('Subjects')
@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @ApiOperation({ summary: 'Create subject' })
  @ApiResponse({ status: 201, type: Subject })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createSubjectDto: CreateSubjectDto,
    @UploadedFile() image: any,
  ) {
    return this.subjectsService.create(createSubjectDto, image);
  }

  @ApiOperation({ summary: 'Get all subjects' })
  @ApiResponse({ status: 200, type: [Subject] })
  @Get()
  findAll() {
    return this.subjectsService.findAll();
  }

  @ApiOperation({ summary: 'Get subject by id' })
  @ApiResponse({ status: 200, type: Subject })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update subject by id' })
  @ApiResponse({ status: 200, type: Subject })
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: string,
    @Body() updateSubjectDto: UpdateSubjectDto,
    @UploadedFile() image: any,
  ) {
    return this.subjectsService.update(+id, updateSubjectDto, image);
  }

  @ApiOperation({ summary: 'Delete subject by id' })
  @ApiResponse({ status: 200, description: 'Subject deleted' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectsService.remove(+id);
  }
}
