import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

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
  @Column({ type: DataType.INTEGER })
  test_group_id: number;
}
