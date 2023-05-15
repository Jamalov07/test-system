import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({ example: 'apple', description: 'group name' })
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty({ example: 4, description: 'stuff id' })
  @IsNotEmpty()
  @IsNumber()
  stuff_id: number;
}
