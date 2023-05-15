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
import { Student } from '../../students/entities/student.entity';
import { TestGroup } from '../../test_groups/entities/test_group.entity';

interface TestResultAttrs {
  student_id: number;
  test_group_id: number;
  corrects_count: number;
}

@Table({ tableName: 'testresults', freezeTableName: true })
export class TestResult extends Model<TestResult, TestResultAttrs> {
  @ApiProperty({ example: 1, description: 'unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'student id' })
  @ForeignKey(() => Student)
  @Column({ type: DataType.INTEGER })
  student_id: number;
  @BelongsTo(() => Student)
  student: Student;
  @ApiProperty({ example: 1, description: 'test group id' })
  @ForeignKey(() => TestGroup)
  @Column({ type: DataType.INTEGER })
  test_group_id: number;
  @BelongsTo(() => TestGroup)
  testgroup: TestGroup;
  @ApiProperty({ example: 1, description: 'corect answers count' })
  @Column({ type: DataType.INTEGER })
  corrects_count: number;
}
