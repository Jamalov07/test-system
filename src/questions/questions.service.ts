import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionsService {
  constructor(@InjectModel(Question) private questionRepo: typeof Question) {}

  async create(createQuestionDto: CreateQuestionDto) {
    return 'This action adds a new question';
  }

  async findAll() {
    return `This action returns all questions`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  async remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
