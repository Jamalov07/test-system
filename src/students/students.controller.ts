import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Student } from './entities/student.entity';
import { LoginStudentDto } from './dto/Loginstudent.dto';
import { Roles } from '../decorators/roles';
import { RolesGuard } from '../guards/roles.guard';

@Controller('students')
@ApiTags('Students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @ApiOperation({summary:"Create Student"})
  @ApiResponse({status:201,type:Student})
  @ApiBearerAuth()
  @Roles('2')
  @UseGuards(RolesGuard)
  @Post()
  create(
    @Body() createStudentDto: CreateStudentDto,
  ) {
    return this.studentsService.create(createStudentDto);
  }

  @ApiOperation({summary:"Get all student"})
  @ApiResponse({status:200,type:[Student]})
  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @ApiOperation({summary:"Get one student by id"})
  @ApiResponse({status:200,type:Student})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }


  @ApiOperation({summary:"Update student"})
  @ApiResponse({status:202,type:Student})
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @ApiOperation({summary:"Delete student"})
  @ApiResponse({status:200,type:"Succesfully deleted"})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }

  @ApiOperation({summary:"Login student"})
  @ApiResponse({status:200,type:"Access token"})
  @Post('login')
  loginStudent(@Body() loginStudentDto: LoginStudentDto) {
    return this.studentsService.login(loginStudentDto);
  }
}
