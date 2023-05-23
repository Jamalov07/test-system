import { Module } from '@nestjs/common';
import { resolve } from 'path';
import { SubjectsModule } from './subjects/subjects.module';
import { StuffsModule } from './stuffs/stuffs.module';
import { GroupsModule } from './groups/groups.module';
import { StuffSubjectsModule } from './stuff_subjects/stuff_subjects.module';
import { TestGroupsModule } from './test_groups/test_groups.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { StudentsModule } from './students/students.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Answer } from './answers/entities/answer.entity';
import { Group } from './groups/entities/group.entity';
import { Question } from './questions/entities/question.entity';
import { Student } from './students/entities/student.entity';
import { StuffSubject } from './stuff_subjects/entities/stuff_subject.entity';
import { Stuff } from './stuffs/entities/stuff.entity';
import { Subject } from './subjects/entities/subject.entity';
import { TestGroup } from './test_groups/entities/test_group.entity';
import { TestResultsModule } from './test_results/test_results.module';
import { TestResult } from './test_results/entities/test_result.entity';
import {ServeStaticModule} from '@nestjs/serve-static'

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env`, isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname,'static')
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [
        Answer,
        Group,
        Question,
        Student,
        StuffSubject,
        Stuff,
        Subject,
        TestGroup,
        TestResult
      ],
      autoLoadModels: true,
      logging: false,
    }),
    SubjectsModule,
    StuffsModule,
    GroupsModule,
    StuffSubjectsModule,
    TestGroupsModule,
    QuestionsModule,
    AnswersModule,
    StudentsModule,
    TestResultsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
