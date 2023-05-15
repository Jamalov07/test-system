import { Injectable } from '@nestjs/common';
import { CreateStuffSubjectDto } from './dto/create-stuff_subject.dto';
import { UpdateStuffSubjectDto } from './dto/update-stuff_subject.dto';
import { InjectModel } from '@nestjs/sequelize';
import { StuffSubject } from './entities/stuff_subject.entity';

@Injectable()
export class StuffSubjectsService {
  constructor(
    @InjectModel(StuffSubject) private stuffsubjectRepo: typeof StuffSubject,
  ) {}

  async create(createStuffSubjectDto: CreateStuffSubjectDto) {
    return 'This action adds a new stuffSubject';
  }

  async findAll() {
    return `This action returns all stuffSubjects`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} stuffSubject`;
  }

  async update(id: number, updateStuffSubjectDto: UpdateStuffSubjectDto) {
    return `This action updates a #${id} stuffSubject`;
  }

  async remove(id: number) {
    return `This action removes a #${id} stuffSubject`;
  }
}
