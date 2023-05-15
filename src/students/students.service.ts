import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Student } from './entities/student.entity';
import { FilesService } from '../files/files.service';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student) private studentRepo: typeof Student,
    private fileService: FilesService,
  ) {}

  async create(createStudentDto: CreateStudentDto, image: any) {
    const candidate1 = await this.studentRepo.findOne({
      where: {
        phone_number: createStudentDto.phone_number,
      },
    });
    const candidate2 = await this.studentRepo.findOne({
      where: {
        username: createStudentDto.username,
      },
    });
    if (candidate1 || candidate2) {
      throw new BadRequestException('student already exists');
    }

    let fileName: string = '';
    if (image) {
      fileName = await this.fileService.createFile(image);
    }
    const newStudent = await this.studentRepo.create({
      ...createStudentDto,
      image: fileName,
    });
    return newStudent;
  }

  async findAll() {
    const students = await this.studentRepo.findAll();
    return students;
  }

  async findOne(id: number) {
    const student = await this.studentRepo.findOne({ where: { id } });
    if (!student) {
      throw new BadRequestException('Student not found');
    }
    return student;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto, image: any) {
    const student = await this.findOne(id);

    const candidate1 = await this.studentRepo.findOne({
      where: {
        phone_number: updateStudentDto.phone_number || student.phone_number,
      },
    });
    const candidate2 = await this.studentRepo.findOne({
      where: {
        username: updateStudentDto.username || student.username,
      },
    });
    if (
      (candidate1 && candidate1.id !== id) ||
      (candidate2 && candidate2.id !== id)
    ) {
      throw new BadRequestException('student already exists');
    }
    let fileName: any = '';
    if (image) {
      await this.fileService.deleteFile(student.image);
      fileName = await this.fileService.createFile(image);
    }

    await student.update({
      ...updateStudentDto,
      image: fileName || student.image,
    });
    return student;
  }

  async remove(id: number) {
    const student = await this.findOne(id);
    await this.fileService.deleteFile(student.image);
    await student.destroy();
    return { message: 'student deleted' };
  }
}
