import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from './entities/subject.entity';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from '../files/files.service';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectModel(Subject) private subjectRepo: typeof Subject,
    private fileService: FilesService,
  ) {}

  async create(createSubjectDto: CreateSubjectDto, image) {
    const candidate = await this.subjectRepo.findOne({
      where: { name: createSubjectDto.name },
    });
    if (candidate) {
      throw new BadRequestException('This subject already exists.');
    }
    let fileName: string = '';
    if (image) {
      fileName = await this.fileService.createFile(image);
    }
    const newSubject = await this.subjectRepo.create({
      ...createSubjectDto,
      image: fileName,
    });
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

  async update(id: number, updateSubjectDto: UpdateSubjectDto, image: any) {
    const subject = await this.findOne(id);
    if (updateSubjectDto.name) {
      const candidate = await this.subjectRepo.findOne({
        where: { name: updateSubjectDto.name },
      });
      if (candidate && candidate.id !== id) {
        throw new BadRequestException('This subject already exists.');
      }
    }
    let fileName: string = '';
    if (image) {
      await this.fileService.deleteFile(subject.image);
      fileName = await this.fileService.createFile(image);
    }
    await subject.update({
      ...updateSubjectDto,
      image: fileName || subject.image,
    });
    return subject;
  }

  async remove(id: number) {
    const subject = await this.findOne(id);
    await this.fileService.deleteFile(subject.image);
    await subject.destroy();
    return { message: 'subject deleted' };
  }
}
