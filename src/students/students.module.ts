import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Student } from './entities/student.entity';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [FilesModule, SequelizeModule.forFeature([Student])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
