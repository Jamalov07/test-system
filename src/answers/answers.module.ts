import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Answer } from './entities/answer.entity';

@Module({
  imports: [SequelizeModule.forFeature([Answer])],
  controllers: [AnswersController],
  providers: [AnswersService],
})
export class AnswersModule {}
