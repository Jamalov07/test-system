import { Module } from '@nestjs/common';
import { StuffSubjectsService } from './stuff_subjects.service';
import { StuffSubjectsController } from './stuff_subjects.controller';

@Module({
  controllers: [StuffSubjectsController],
  providers: [StuffSubjectsService]
})
export class StuffSubjectsModule {}
