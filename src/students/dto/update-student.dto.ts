import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateStudentDto {
  @ApiProperty({ example: 'AAA', description: 'full name' })
  @IsOptional()
  @IsString()
  full_name: string;
  @ApiProperty({ example: 'link', description: 'image' })
  @IsOptional()
  @IsString()
  image: string;
  @ApiProperty({ example: '+99890 001 02 03', description: 'phone number' })
  @IsOptional()
  @IsString()
  phone_number: string;
  @ApiProperty({ example: 'student11', description: 'username' })
  @IsOptional()
  @IsString()
  username: string;
  @ApiProperty({ example: '11stu', description: 'password' })
  @IsOptional()
  @IsString()
  password: string;
  @ApiProperty({ example: 2, description: 'student group id' })
  @IsOptional()
  @IsNumber()
  group_id: number;
}
