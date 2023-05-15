import { Module } from '@nestjs/common';
import { SubjectsModule } from './subjects/subjects.module';
import { StuffsModule } from './stuffs/stuffs.module';
import { GroupsModule } from './groups/groups.module';
import { StuffSubjectsModule } from './stuff_subjects/stuff_subjects.module';
import { TestGroupsModule } from './test_groups/test_groups.module';
import { RolesModule } from './roles/roles.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { StudentsModule } from './students/students.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env`, isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [],
      autoLoadModels: true,
      logging: false,
    }),
    SubjectsModule,
    StuffsModule,
    GroupsModule,
    StuffSubjectsModule,
    TestGroupsModule,
    RolesModule,
    QuestionsModule,
    AnswersModule,
    StudentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
