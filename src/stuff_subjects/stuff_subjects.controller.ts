import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StuffSubjectsService } from './stuff_subjects.service';
import { CreateStuffSubjectDto } from './dto/create-stuff_subject.dto';
import { UpdateStuffSubjectDto } from './dto/update-stuff_subject.dto';

@Controller('stuff-subjects')
export class StuffSubjectsController {
  constructor(private readonly stuffSubjectsService: StuffSubjectsService) {}

  @Post()
  create(@Body() createStuffSubjectDto: CreateStuffSubjectDto) {
    return this.stuffSubjectsService.create(createStuffSubjectDto);
  }

  @Get()
  findAll() {
    return this.stuffSubjectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stuffSubjectsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStuffSubjectDto: UpdateStuffSubjectDto) {
    return this.stuffSubjectsService.update(+id, updateStuffSubjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stuffSubjectsService.remove(+id);
  }
}
