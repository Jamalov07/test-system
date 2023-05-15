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
import { TestGroup } from '../../test_groups/entities/test_group.entity';
import { Answer } from '../../answers/entities/answer.entity';

interface QuestionAttrs {
  question: string;
  test_group_id: number;
}

@Table({ tableName: 'questions', freezeTableName: true })
export class Question extends Model<Question, QuestionAttrs> {
  @ApiProperty({ example: 1, description: 'unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'what is it?', description: 'question text' })
  @Column({ type: DataType.STRING })
  question: string;

  @ApiProperty({ example: 4, description: 'test Question id' })
  @ForeignKey(() => TestGroup)
  @Column({ type: DataType.INTEGER })
  test_group_id: number;
  @BelongsTo(() => TestGroup)
  testgroup: TestGroup;

  @HasMany(() => Answer)
  answers: Answer[];
}
