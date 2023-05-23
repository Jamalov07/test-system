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
import { Group } from '../../groups/entities/group.entity';
import { StuffSubject } from '../../stuff_subjects/entities/stuff_subject.entity';

interface StuffAttrs {
  full_name: string;
  image: string;
  phone_number: string;
  username: string;
  password: string;
  role_id: number;
}

@Table({ tableName: 'stuffs', freezeTableName: true })
export class Stuff extends Model<Stuff, StuffAttrs> {
  @ApiProperty({ example: 1, description: 'unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'AAA', description: 'full name' })
  @Column({ type: DataType.STRING })
  full_name: string;
  @ApiProperty({ example: 'link', description: 'image' })
  @Column({ type: DataType.STRING })
  image: string;
  @ApiProperty({ example: '+99890 001 02 03', description: 'phone number' })
  @Column({ type: DataType.STRING })
  phone_number: string;
  @ApiProperty({ example: 'Stuff11', description: 'username' })
  @Column({ type: DataType.STRING })
  username: string;
  @ApiProperty({ example: '11stu', description: 'password' })
  @Column({ type: DataType.STRING })
  password: string;
  @ApiProperty({ example: 2, description: 'Stuff role id' })
  @Column({ type: DataType.INTEGER })
  role_id: number;
  @ApiProperty({ example: 'token21312jnwefa', description: 'refresh_token' })
  @Column({ type: DataType.STRING })
  token: string;

  @HasMany(() => Group)
  groups: Group[];

  @HasMany(() => StuffSubject)
  stuff_subjects: StuffSubject[];
}
