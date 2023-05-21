import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Answer } from './entities/answer.entity';

@Injectable()
export class AnswersService {
  constructor(@InjectModel(Answer) private answerRepo: typeof Answer) {}

  async create(createAnswerDto: CreateAnswerDto) {
    const candidate = await this.answerRepo.findOne({
      where: {
        question_id: createAnswerDto.question_id,
        answer: createAnswerDto.answer,
      },
      include: { all: true, nested: true }
    });
    if (candidate) {
      throw new BadRequestException(
        'This answer already exists for this question',
      );
    }

    const newAnswer = await this.answerRepo.create(createAnswerDto);
    return newAnswer;
  }

  async findAll() {
    const answers = await this.answerRepo.findAll({ include: { all: true, nested: true }});
    return answers;
  }

  async findOne(id: number) {
    const answer = await this.answerRepo.findOne({ where: { id }, include: { all: true, nested: true } });
    if (!answer) {
      throw new BadRequestException('Answer not found');
    }
    return answer;
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto) {
    const answer = await this.findOne(id);
    const candidate = await this.answerRepo.findOne({
      where: {
        question_id: updateAnswerDto.question_id || answer.question_id,
        answer: updateAnswerDto.answer || answer.answer,
      },
      include: { all: true, nested: true }
    });
    if (candidate && candidate.id !== id) {
      throw new BadRequestException(
        'This answer already exists for this question',
      );
    }

    await answer.update(updateAnswerDto);
    return answer;
  }

  async remove(id: number) {
    const answer = await this.findOne(id);
    await answer.destroy();
    return { message: 'answer deleted' };
  }
}
