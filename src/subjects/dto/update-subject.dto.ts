import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateSubjectDto {
  @ApiProperty({ example: 'apple', description: 'Subject name' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ example: 'link', description: 'subject photo' })
  @IsOptional()
  @IsString()
  image: string;
}
