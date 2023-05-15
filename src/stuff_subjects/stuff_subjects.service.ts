import { Injectable } from '@nestjs/common';
import { CreateStuffSubjectDto } from './dto/create-stuff_subject.dto';
import { UpdateStuffSubjectDto } from './dto/update-stuff_subject.dto';

@Injectable()
export class StuffSubjectsService {
  create(createStuffSubjectDto: CreateStuffSubjectDto) {
    return 'This action adds a new stuffSubject';
  }

  findAll() {
    return `This action returns all stuffSubjects`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stuffSubject`;
  }

  update(id: number, updateStuffSubjectDto: UpdateStuffSubjectDto) {
    return `This action updates a #${id} stuffSubject`;
  }

  remove(id: number) {
    return `This action removes a #${id} stuffSubject`;
  }
}
