import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStuffDto {
  @ApiProperty({ example: 'AAA', description: 'full name' })
  @IsNotEmpty()
  @IsString()
  full_name: string;
  @ApiProperty({ example: 'link', description: 'image' })
  @IsNotEmpty()
  @IsString()
  image: string;
  @ApiProperty({ example: '+99890 001 02 03', description: 'phone number' })
  @IsNotEmpty()
  @IsString()
  phone_number: string;
  @ApiProperty({ example: 'Stuff11', description: 'username' })
  @IsNotEmpty()
  @IsString()
  username: string;
  @ApiProperty({ example: '11stu', description: 'password' })
  @IsNotEmpty()
  @IsString()
  password: string;
  @ApiProperty({ example: 2, description: 'Stuff role id' })
  @IsNotEmpty()
  @IsNumber()
  role_id: number;
}