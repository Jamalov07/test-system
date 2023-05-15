import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Subject } from './entities/subject.entity';

@Module({
  imports: [SequelizeModule.forFeature([Subject])],
  controllers: [SubjectsController],
  providers: [SubjectsService],
})
export class SubjectsModule {}
