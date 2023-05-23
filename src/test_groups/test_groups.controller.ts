import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TestGroupsService } from './test_groups.service';
import { CreateTestGroupDto } from './dto/create-test_group.dto';
import { UpdateTestGroupDto } from './dto/update-test_group.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TestGroup } from './entities/test_group.entity';

@ApiBearerAuth()
@ApiTags('Test-groups')
@Controller('test-groups')
export class TestGroupsController {
  constructor(private readonly testGroupsService: TestGroupsService) {}

  @ApiOperation({ summary: 'Create test group' })
  @ApiResponse({ status: 201, type: TestGroup })
  @Post()
  create(@Body() createTestGroupDto: CreateTestGroupDto) {
    return this.testGroupsService.create(createTestGroupDto);
  }

  @ApiOperation({ summary: 'Get all test groups' })
  @ApiResponse({ status: 200, type: [TestGroup] })
  @Get()
  findAll() {
    return this.testGroupsService.findAll();
  }

  @ApiOperation({ summary: 'Get test group by id' })
  @ApiResponse({ status: 200, type: TestGroup })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testGroupsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update test group by id' })
  @ApiResponse({ status: 200, type: TestGroup })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTestGroupDto: UpdateTestGroupDto,
  ) {
    return this.testGroupsService.update(+id, updateTestGroupDto);
  }

  @ApiOperation({ summary: 'Delete test group by id' })
  @ApiResponse({ status: 200, description: 'Test group deleted' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testGroupsService.remove(+id);
  }
}
