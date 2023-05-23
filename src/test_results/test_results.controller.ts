import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TestResultsService } from './test_results.service';
import { CreateTestResultDto } from './dto/create-test_result.dto';
import { UpdateTestResultDto } from './dto/update-test_result.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TestResult } from './entities/test_result.entity';

@ApiBearerAuth()
@ApiTags('Test-results')
@Controller('test-results')
export class TestResultsController {
  constructor(private readonly testResultsService: TestResultsService) {}

  @ApiOperation({ summary: 'Create test result' })
  @ApiResponse({ status: 201, type: TestResult })
  @Post()
  create(@Body() createTestResultDto: CreateTestResultDto) {
    return this.testResultsService.create(createTestResultDto);
  }

  @ApiOperation({ summary: 'Get all test results' })
  @ApiResponse({ status: 200, type: [TestResult] })
  @Get()
  findAll() {
    return this.testResultsService.findAll();
  }

  @ApiOperation({ summary: 'Get test result by id' })
  @ApiResponse({ status: 200, type: TestResult })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testResultsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update test result by id' })
  @ApiResponse({ status: 200, type: TestResult })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTestResultDto: UpdateTestResultDto,
  ) {
    return this.testResultsService.update(+id, updateTestResultDto);
  }

  @ApiOperation({ summary: 'Delete test result by id' })
  @ApiResponse({ status: 200, description: 'Test result deleted' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testResultsService.remove(+id);
  }
}
