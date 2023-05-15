import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAnswerDto {
  @ApiProperty({ example: 'apple', description: 'answer text' })
  @IsNotEmpty()
  @IsString()
  answer: string;
  @ApiProperty({ example: true, description: 'answer status' })
  @IsNotEmpty()
  @IsBoolean()
  is_true: boolean;
  @ApiProperty({ example: 4, description: 'question id' })
  @IsNotEmpty()
  @IsNumber()
  question_id: number;
}
