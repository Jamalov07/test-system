import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'role name' })
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty({ example: 'about admin role', description: 'about role' })
  @IsNotEmpty()
  @IsString()
  description: string;
}
