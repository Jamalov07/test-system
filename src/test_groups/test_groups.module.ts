import { Module } from '@nestjs/common';
import { TestGroupsService } from './test_groups.service';
import { TestGroupsController } from './test_groups.controller';

@Module({
  controllers: [TestGroupsController],
  providers: [TestGroupsService]
})
export class TestGroupsModule {}
