import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubjectDto {
  @ApiProperty({ example: 'apple', description: 'Subject name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'link', description: 'subject photo' })
  @IsNotEmpty()
  @IsString()
  image: string;
}
