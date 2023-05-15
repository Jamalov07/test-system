import { Module } from '@nestjs/common';
import { StuffSubjectsService } from './stuff_subjects.service';
import { StuffSubjectsController } from './stuff_subjects.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { StuffSubject } from './entities/stuff_subject.entity';

@Module({
  imports: [SequelizeModule.forFeature([StuffSubject])],
  controllers: [StuffSubjectsController],
  providers: [StuffSubjectsService],
})
export class StuffSubjectsModule {}
