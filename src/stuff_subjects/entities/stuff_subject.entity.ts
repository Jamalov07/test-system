import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

interface StuffSubjectAttrs {
  stuff_id: number;
  subject_id: number;
}

@Table({ tableName: 'stuffsubjects', freezeTableName: true })
export class StuffSubject extends Model<StuffSubject, StuffSubjectAttrs> {
  @ApiProperty({ example: 1, description: 'unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'stuff id' })
  @Column({ type: DataType.INTEGER })
  stuff_id: number;
  @ApiProperty({ example: 1, description: 'stuff id' })
  @Column({ type: DataType.INTEGER })
  subject_id: number;
}
