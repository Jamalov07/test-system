import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTestResultDto {
  @ApiProperty({ example: 1, description: 'student id' })
  @IsNotEmpty()
  @IsNumber()
  student_id: number;
  @ApiProperty({ example: 1, description: 'test group id' })
  @IsNotEmpty()
  @IsNumber()
  test_group_id: number;
  @ApiProperty({ example: 1, description: 'corect answers count' })
  @IsNotEmpty()
  @IsNumber()
  corrects_count: number;
}
