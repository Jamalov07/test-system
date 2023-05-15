import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from './entities/subject.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class SubjectsService {
  constructor(@InjectModel(Subject) private subjectRepo: typeof Subject) {}

  async create(createSubjectDto: CreateSubjectDto) {
    return 'This action adds a new subject';
  }

  async findAll() {
    return `This action returns all subjects`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} subject`;
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    return `This action updates a #${id} subject`;
  }

  async remove(id: number) {
    return `This action removes a #${id} subject`;
  }
}
