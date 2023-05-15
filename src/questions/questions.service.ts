import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionsService {
  constructor(@InjectModel(Question) private questionRepo: typeof Question) {}

  async create(createQuestionDto: CreateQuestionDto) {
    const candidate = await this.questionRepo.findOne({
      where: {
        question: createQuestionDto.question,
        test_group_id: createQuestionDto.test_group_id,
      },
    });
    if (candidate) {
      throw new BadRequestException('Question already exists');
    }

    const newQuestion = await this.questionRepo.create(createQuestionDto);
    return newQuestion;
  }

  async findAll() {
    const quetions = await this.questionRepo.findAll();
    return quetions;
  }

  async findOne(id: number) {
    const question = await this.questionRepo.findOne({ where: { id } });
    if (!question) {
      throw new BadRequestException('Question not found');
    }
    return question;
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const question = await this.findOne(id);
    const candidate = await this.questionRepo.findOne({
      where: {
        question: updateQuestionDto.question || question.question,
        test_group_id:
          updateQuestionDto.test_group_id || question.test_group_id,
      },
    });
    if (candidate && candidate.id !== id) {
      throw new BadRequestException('Question already exists');
    }

    await question.update(updateQuestionDto);
    return question;
  }

  async remove(id: number) {
    const question = await this.findOne(id);
    await question.destroy();
    return { message: 'question deleted' };
  }
}
