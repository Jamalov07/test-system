import { BadRequestException, Injectable,HttpException,HttpStatus } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Student } from './entities/student.entity';
import { FilesService } from '../files/files.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import { LoginStudentDto } from './dto/Loginstudent.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student) private studentRepo: typeof Student,
    private fileService: FilesService,
    private jwtService: JwtService,
  ) {}

async create(createStudentDto: CreateStudentDto,) {
    const candidate1 = await this.studentRepo.findOne({
      where:{
        [Op.or]: [
          { phone_number: createStudentDto.phone_number },
          { username: createStudentDto.username },
        ],
      }
    })
    if (candidate1) {
      throw new BadRequestException('student already exists');
    }

    const hashed = await bcrypt.hash(createStudentDto.password, 7);
    const newStudent = await this.studentRepo.create({
      ...createStudentDto,
      password: hashed,
    });
    const tokens = await this.getTokens(newStudent.id,4);
    const resp = {
      data:newStudent,
      access_token:tokens.access_token
    }
    return resp;
  }

  async findAll() {
    const students = await this.studentRepo.findAll({ include: { all: true, nested: true }});
    return students;
  }

  async findOne(id: number) {
    const student = await this.studentRepo.findOne({ where: { id }, include: { all: true, nested: true } });
    if (!student) {
      throw new BadRequestException('Student not found');
    }
    return student;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const student = await this.findOne(id);

    const candidate1 = await this.studentRepo.findOne({
      where:{
        [Op.or]:[
          {phone_number:updateStudentDto.phone_number || student.phone_number},
          {username: updateStudentDto.username || student.username}
        ]
      }
    });
    if (
      (candidate1 && candidate1.id !== id)
    ) {
      throw new BadRequestException('student already exists');
    }
    let password = student.password;
    if (updateStudentDto.password) {
      password = await bcrypt.hash(updateStudentDto.password, 7);
    }

    await student.update({
      ...updateStudentDto,
      password: password,
    });
    return student;
  }

  async remove(id: number) {
    const student = await this.studentRepo.destroy({
      where:{
        id: id
      }
    })
    return { message: 'student deleted' };
  }

  async login(loginStudentDto:LoginStudentDto) {
    const {login,password } = loginStudentDto;
    const check = await this.studentRepo.findOne({
      where:{
          username:login
      }  
    });
    if(!check) {
      throw new HttpException(
        "Username is incorrect, Student not found",
        HttpStatus.NOT_FOUND
      )
    }

    const isEqual = await bcrypt.compare(password,check.password);
    if(!isEqual) {
      throw new HttpException(
        "Password not matched",
        HttpStatus.UNAUTHORIZED
      )
    };
    let hashed = await bcrypt.hash(password,7);
    await check.update({
      password:hashed
    })
    await check.save()
    const tokens = await this.getTokens(check.id,4);
    return {
      message:"Succesffuly signin",
      data:check.id,
      access_token:tokens.access_token
    }
  }
  async getTokens(id: number,role_id:number) {
    const jwtPayload = {
      id: id,
      role_id: role_id
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
            include: { all: true, nested: true }
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
