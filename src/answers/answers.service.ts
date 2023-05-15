import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Answer } from './entities/answer.entity';

@Injectable()
export class AnswersService {
  constructor(@InjectModel(Answer) private answerRepo: typeof Answer) {}

  async create(createAnswerDto: CreateAnswerDto) {
    return 'This action adds a new answer';
  }

  async findAll() {
    return `This action returns all answers`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} answer`;
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return `This action updates a #${id} answer`;
  }

  async remove(id: number) {
    return `This action removes a #${id} answer`;
  }
}
