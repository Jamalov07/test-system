import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateStuffSubjectDto {
  @ApiProperty({ example: 1, description: 'stuff id' })
  @IsNotEmpty()
  @IsNumber()
  stuff_id: number;
  @ApiProperty({ example: 1, description: 'stuff id' })
  @IsNotEmpty()
  @IsNumber()
  subject_id: number;
}
