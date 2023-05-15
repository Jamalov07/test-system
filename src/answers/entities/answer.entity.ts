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
import { Question } from '../../questions/entities/question.entity';

interface AnswerAttrs {
  answer: string;
  is_true: boolean;
  question_id: number;
}

@Table({ tableName: 'answers', freezeTableName: true })
export class Answer extends Model<Answer, AnswerAttrs> {
  @ApiProperty({ example: 1, description: 'unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'apple', description: 'answer text' })
  @Column({ type: DataType.STRING })
  answer: string;
  @ApiProperty({ example: true, description: 'answer status' })
  @Column({ type: DataType.BOOLEAN })
  is_true: boolean;
  @ApiProperty({ example: 4, description: 'question id' })
  @ForeignKey(() => Question)
  @Column({ type: DataType.INTEGER })
  question_id: number;
  @BelongsTo(() => Question)
  question: Question;
}
