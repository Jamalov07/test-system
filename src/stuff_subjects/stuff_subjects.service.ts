import { BadRequestException, Injectable } from '@nestjs/common';
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
    const candidate = await this.stuffsubjectRepo.findOne({
      where: { ...createStuffSubjectDto },
      include: { all: true, nested: true }
    });
    if (candidate) {
      throw new BadRequestException(
        'This subject in this stuff already exists',
      );
    }
    const newStuffSubject = await this.stuffsubjectRepo.create(
      createStuffSubjectDto,
    );
    return newStuffSubject;
  }

  async findAll() {
    const stuffSubjects = await this.stuffsubjectRepo.findAll({ include: { all: true, nested: true }});
    return stuffSubjects;
  }

  async findOne(id: number) {
    const stuffsubject = await this.stuffsubjectRepo.findOne({ where: { id }, include: { all: true, nested: true } });
    if (!stuffsubject) {
      throw new BadRequestException('stuff subject not found');
    }
    return stuffsubject;
  }

  async update(id: number, updateStuffSubjectDto: UpdateStuffSubjectDto) {
    const stuffsubject = await this.findOne(id);
    const candidate = await this.stuffsubjectRepo.findOne({
      where: {
        stuff_id: updateStuffSubjectDto.stuff_id || stuffsubject.stuff_id,
        subject_id: updateStuffSubjectDto.subject_id || stuffsubject.subject_id,
      },
      include: { all: true, nested: true }
    });
    if (candidate && candidate.id !== id) {
      throw new BadRequestException(
        'This subject in this stuff already exists',
      );
    }

    await stuffsubject.update(updateStuffSubjectDto);
    return stuffsubject;
  }

  async remove(id: number) {
    const stuffsubject = await this.findOne(id);
    await stuffsubject.destroy();
    return { message: 'stuff subject deleted' };
  }
}
