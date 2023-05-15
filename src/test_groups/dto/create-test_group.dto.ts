import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTestGroupDto {
  @ApiProperty({ example: 4, description: 'subject id' })
  @IsNotEmpty()
  @IsNumber()
  subject_id: number;

  @ApiProperty({ example: 15, description: 'tests count' })
  @IsNotEmpty()
  @IsNumber()
  tests_count: number;
}
