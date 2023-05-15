import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber } from 'class-validator';

export class UpdateStuffSubjectDto {
  @ApiProperty({ example: 1, description: 'stuff id' })
  @IsOptional()
  @IsNumber()
  stuff_id: number;
  @ApiProperty({ example: 1, description: 'stuff id' })
  @IsOptional()
  @IsNumber()
  subject_id: number;
}
