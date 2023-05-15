import { Module } from '@nestjs/common';
import { TestResultsService } from './test_results.service';
import { TestResultsController } from './test_results.controller';

@Module({
  controllers: [TestResultsController],
  providers: [TestResultsService]
})
export class TestResultsModule {}
