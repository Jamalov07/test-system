import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString } from 'class-validator';
export class UpdateQuestionDto {
  @ApiProperty({ example: 'what is it?', description: 'question text' })
  @IsOptional()
  @IsString()
  question: string;
  @ApiProperty({ example: 4, description: 'test Question id' })
  @IsOptional()
  @IsNumber()
  test_group_id: number;
}
