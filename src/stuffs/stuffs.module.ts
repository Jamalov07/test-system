import { Module } from '@nestjs/common';
import { StuffsService } from './stuffs.service';
import { StuffsController } from './stuffs.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Stuff } from './entities/stuff.entity';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [FilesModule, SequelizeModule.forFeature([Stuff])],
  controllers: [StuffsController],
  providers: [StuffsService],
})
export class StuffsModule {}
