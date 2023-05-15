import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateQuestionDto {
  @ApiProperty({ example: 'what is it?', description: 'question text' })
  @IsNotEmpty()
  @IsString()
  question: string;
  @ApiProperty({ example: 4, description: 'test Question id' })
  @IsNotEmpty()
  @IsNumber()
  test_group_id: number;
}
