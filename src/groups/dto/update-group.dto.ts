import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateGroupDto {
  @ApiProperty({ example: 'apple', description: 'group name' })
  @IsOptional()
  @IsString()
  name: string;
  @ApiProperty({ example: 4, description: 'stuff id' })
  @IsOptional()
  @IsNumber()
  stuff_id: number;
}
