import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

interface TestGroupAttrs {
  subject_id: number;
  tests_count: number;
}

@Table({ tableName: 'testgroups', freezeTableName: true })
export class TestGroup extends Model<TestGroup, TestGroupAttrs> {
  @ApiProperty({ example: 1, description: 'unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 4, description: 'subject id' })
  @Column({ type: DataType.INTEGER })
  subject_id: number;

  @ApiProperty({ example: 15, description: 'tests count' })
  @Column({ type: DataType.INTEGER })
  tests_count: number;
}
