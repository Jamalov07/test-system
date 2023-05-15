import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'role name' })
  @IsOptional()
  @IsString()
  name: string;
  @ApiProperty({ example: 'about admin role', description: 'about role' })
  @IsOptional()
  @IsString()
  description: string;
}
