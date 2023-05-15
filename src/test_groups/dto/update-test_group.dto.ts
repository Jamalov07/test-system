import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber } from 'class-validator';

export class UpdateTestGroupDto {
  @ApiProperty({ example: 4, description: 'subject id' })
  @IsOptional()
  @IsNumber()
  subject_id: number;

  @ApiProperty({ example: 15, description: 'tests count' })
  @IsOptional()
  @IsNumber()
  tests_count: number;
}
