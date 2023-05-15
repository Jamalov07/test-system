import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestGroupsService } from './test_groups.service';
import { CreateTestGroupDto } from './dto/create-test_group.dto';
import { UpdateTestGroupDto } from './dto/update-test_group.dto';

@Controller('test-groups')
export class TestGroupsController {
  constructor(private readonly testGroupsService: TestGroupsService) {}

  @Post()
  create(@Body() createTestGroupDto: CreateTestGroupDto) {
    return this.testGroupsService.create(createTestGroupDto);
  }

  @Get()
  findAll() {
    return this.testGroupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testGroupsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestGroupDto: UpdateTestGroupDto) {
    return this.testGroupsService.update(+id, updateTestGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testGroupsService.remove(+id);
  }
}
