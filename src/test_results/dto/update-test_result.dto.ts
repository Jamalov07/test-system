import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber } from 'class-validator';

export class UpdateTestResultDto {
  @ApiProperty({ example: 1, description: 'student id' })
  @IsOptional()
  @IsNumber()
  student_id: number;
  @ApiProperty({ example: 1, description: 'test group id' })
  @IsOptional()
  @IsNumber()
  test_group_id: number;
  @ApiProperty({ example: 1, description: 'corect answers count' })
  @IsOptional()
  @IsNumber()
  corrects_count: number;
}
