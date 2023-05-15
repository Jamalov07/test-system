import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Stuff } from '../../stuffs/entities/stuff.entity';

interface RoleAttrs {
  name: string;
  description: string;
}

@Table({ tableName: 'roles', freezeTableName: true })
export class Role extends Model<Role, RoleAttrs> {
  @ApiProperty({ example: 1, description: 'unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'ADMIN', description: 'role name' })
  @Column({ type: DataType.STRING })
  name: string;
  @ApiProperty({ example: 'about admin role', description: 'about role' })
  @Column({ type: DataType.STRING })
  description: string;

  @HasMany(() => Stuff)
  stuffs: Stuff[];
}
