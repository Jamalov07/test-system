import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTestResultDto } from './dto/create-test_result.dto';
import { UpdateTestResultDto } from './dto/update-test_result.dto';
import { InjectModel } from '@nestjs/sequelize';
import { TestResult } from './entities/test_result.entity';

@Injectable()
export class TestResultsService {
  constructor(
    @InjectModel(TestResult) private testresultRepo: typeof TestResult,
  ) {}

  async create(createTestResultDto: CreateTestResultDto) {
    const newTestResult = await this.testresultRepo.create(createTestResultDto);
    return newTestResult;
  }

  async findAll() {
    const testresults = await this.testresultRepo.findAll();
    return testresults;
  }

  async findOne(id: number) {
    const testresult = await this.testresultRepo.findOne({ where: { id } });
    if (!testresult) {
      throw new BadRequestException('Test result not found');
    }
    return testresult;
  }

  async update(id: number, updateTestResultDto: UpdateTestResultDto) {
    const testresult = await this.findOne(id);
    await testresult.update(updateTestResultDto);
    return testresult;
  }

  async remove(id: number) {
    const testresult = await this.findOne(id);
    await testresult.destroy();
    return {message:"test result deleted"}
  }
}
