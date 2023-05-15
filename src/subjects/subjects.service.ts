import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from './entities/subject.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class SubjectsService {
  constructor(@InjectModel(Subject) private subjectRepo: typeof Subject) {}

  async create(createSubjectDto: CreateSubjectDto) {
    const candidate = await this.subjectRepo.findOne({
      where: { name: createSubjectDto.name },
    });
    if (candidate) {
      throw new BadRequestException('This subject already exists.');
    }
    const newSubject = await this.subjectRepo.create(createSubjectDto);
    return newSubject;
  }

  async findAll() {
    const subjects = await this.subjectRepo.findAll();
    return subjects;
  }

  async findOne(id: number) {
    const subject = await this.subjectRepo.findOne({ where: { id } });
    if (!subject) {
      throw new BadRequestException('Subject not found');
    }
    return subject;
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    const subject = await this.findOne(id);
    if (updateSubjectDto.name) {
      const candidate = await this.subjectRepo.findOne({
        where: { name: updateSubjectDto.name },
      });
      if (candidate && candidate.id !== id) {
        throw new BadRequestException('This subject already exists.');
      }
    }
    await subject.update(updateSubjectDto);
    return subject;
  }

  async remove(id: number) {
    const subject = await this.findOne(id);
    await subject.destroy();
    return { message: 'subject deleted' };
  }
}
