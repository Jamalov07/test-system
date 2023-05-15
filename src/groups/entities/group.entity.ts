import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Stuff } from '../../stuffs/entities/stuff.entity';
import { Student } from '../../students/entities/student.entity';

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
  @ForeignKey(() => Stuff)
  @Column({ type: DataType.INTEGER })
  stuff_id: number;
  @BelongsTo(() => Stuff)
  stuff: Stuff;

  @HasMany(() => Student)
  students: Student[];
}
