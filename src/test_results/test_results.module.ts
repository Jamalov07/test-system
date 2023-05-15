import { Module } from '@nestjs/common';
import { TestResultsService } from './test_results.service';
import { TestResultsController } from './test_results.controller';
import { TestResult } from './entities/test_result.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports:[SequelizeModule.forFeature([TestResult])],
  controllers: [TestResultsController],
  providers: [TestResultsService]
})
export class TestResultsModule {}
