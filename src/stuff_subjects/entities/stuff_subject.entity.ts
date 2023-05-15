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
import { Subject } from '../../subjects/entities/subject.entity';


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
  @ForeignKey(() => Stuff)
  @Column({ type: DataType.INTEGER })
  stuff_id: number;
  @BelongsTo(() => Stuff)
  stuff: Stuff;
  @ApiProperty({ example: 1, description: 'stuff id' })
  @ForeignKey(() => Subject)
  @Column({ type: DataType.INTEGER })
  subject_id: number;
  @BelongsTo(() => Subject)
  subject: Subject;
}
