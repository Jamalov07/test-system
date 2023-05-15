import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

interface GroupAttrs {
  name: string;
  stuff_id: number;
}

@Table({ tableName: 'groups', freezeTableName: true })
export class Group extends Model<Group, GroupAttrs> {
  @ApiProperty({ example: 1, description: 'unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'apple', description: 'group name' })
  @Column({ type: DataType.STRING })
  name: string;

  @ApiProperty({ example: 4, description: 'stuff id' })
  @Column({ type: DataType.INTEGER })
  stuff_id: number;
}
