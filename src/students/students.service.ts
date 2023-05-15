import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Student } from './entities/student.entity';
import { FilesService } from '../files/files.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student) private studentRepo: typeof Student,
    private fileService: FilesService,
    private jwtService: JwtService,
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

    const hashed = await bcrypt.hash(createStudentDto.password, 7);
    const newStudent = await this.studentRepo.create({
      ...createStudentDto,
      image: fileName,
      password: hashed,
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
    let fileName: any = student.image;
    if (image) {
      await this.fileService.deleteFile(student.image);
      fileName = await this.fileService.createFile(image);
    }

    let password = student.password;
    if (updateStudentDto.password) {
      password = await bcrypt.hash(updateStudentDto.password, 7);
    }

    await student.update({
      ...updateStudentDto,
      image: fileName,
      password: password,
    });
    return student;
  }

  async remove(id: number) {
    const student = await this.findOne(id);
    await this.fileService.deleteFile(student.image);
    await student.destroy();
    return { message: 'student deleted' };
  }

  async login(authBody: { username: string; password: string }) {
    const { username, password } = authBody;
    const student = await this.studentRepo.findOne({
      where: { username },
      include: { all: true },
    });
    if (!student) {
      throw new BadRequestException('Incorrect username');
    }
    const correct_password = await bcrypt.compare(password, student.password);
    if (!correct_password) {
      throw new BadRequestException('Incorrect password');
    }

    const tokens = await this.getTokens(student.id);

    return { student, tokens };
  }

  async getTokens(id: number) {
    const jwtPayload = {
      id: id,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });

      if (data) {
        if (data.id) {
          const student = await this.studentRepo.findOne({
            where: { id: data.id },
            include: { all: true },
          });
          if (student) {
            return {
              isValid: true,
              tokenData: data,
              student: student,
            };
          }
        }
      }
      return { isValid: false };
    } catch (error) {
      return { isValid: false, message: error };
    }
  }
}
