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
import { Subject } from '../../subjects/entities/subject.entity';
import { TestResult } from '../../test_results/entities/test_result.entity';
import { Question } from '../../questions/entities/question.entity';

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
  @ForeignKey(() => Subject)
  @Column({ type: DataType.INTEGER })
  subject_id: number;
  @BelongsTo(() => Subject)
  subject: Subject;

  @ApiProperty({ example: 15, description: 'tests count' })
  @Column({ type: DataType.INTEGER })
  tests_count: number;

  @HasMany(() => TestResult)
  results: TestResult[];

  @HasMany(() => Question)
  questions: Question[];
}
