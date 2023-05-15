import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
  constructor(@InjectModel(Student) private studentRepo: typeof Student) {}

  async create(createStudentDto: CreateStudentDto) {
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

    const newStudent = await this.studentRepo.create(createStudentDto);
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

  async update(id: number, updateStudentDto: UpdateStudentDto) {
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

    await student.update(updateStudentDto);
    return student;
  }

  async remove(id: number) {
    const student = await this.findOne(id);
    await student.destroy();
    return { message: 'student deleted' };
  }
}
