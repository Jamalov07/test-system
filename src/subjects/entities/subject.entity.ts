import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

interface SubjectAttrs {
  name: string;
  image: string;
}

@Table({ tableName: 'subjects', freezeTableName: true })
export class Subject extends Model<Subject, SubjectAttrs> {
  @ApiProperty({ example: 1, description: 'unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'apple', description: 'Subject name' })
  @Column({ type: DataType.STRING })
  name: string;

  @ApiProperty({ example: 'link', description: 'subject photo' })
  @Column({ type: DataType.STRING })
  image: string;
}
