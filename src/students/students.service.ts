import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
  constructor(@InjectModel(Student) private studentRepo: typeof Student) {}

  async create(createStudentDto: CreateStudentDto) {
    return 'This action adds a new student';
  }

  async findAll() {
    return `This action returns all students`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  async remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
