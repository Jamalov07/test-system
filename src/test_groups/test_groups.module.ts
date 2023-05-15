import { Module } from '@nestjs/common';
import { TestGroupsService } from './test_groups.service';
import { TestGroupsController } from './test_groups.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TestGroup } from './entities/test_group.entity';

@Module({
  imports: [SequelizeModule.forFeature([TestGroup])],
  controllers: [TestGroupsController],
  providers: [TestGroupsService],
})
export class TestGroupsModule {}
