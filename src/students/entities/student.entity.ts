import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

interface StudentAttrs {
  full_name: string;
  image: string;
  phone_number: string;
  username: string;
  password: string;
  group_id: number;
}

@Table({ tableName: 'students', freezeTableName: true })
export class Student extends Model<Student, StudentAttrs> {
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
  @ApiProperty({ example: 'student11', description: 'username' })
  @Column({ type: DataType.STRING })
  username: string;
  @ApiProperty({ example: '11stu', description: 'password' })
  @Column({ type: DataType.STRING })
  password: string;
  @ApiProperty({ example: 2, description: 'student group id' })
  @Column({ type: DataType.INTEGER })
  group_id: number;
}
