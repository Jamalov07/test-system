import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateAnswerDto {
  @ApiProperty({ example: 'apple', description: 'answer text' })
  @IsOptional()
  @IsString()
  answer: string;
  @ApiProperty({ example: true, description: 'answer status' })
  @IsOptional()
  @IsBoolean()
  is_true: boolean;
  @ApiProperty({ example: 4, description: 'question id' })
  @IsOptional()
  @IsNumber()
  question_id: number;
}
