import { Injectable } from '@nestjs/common';
import { CreateStuffDto } from './dto/create-stuff.dto';
import { UpdateStuffDto } from './dto/update-stuff.dto';
import { Stuff } from './entities/stuff.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class StuffsService {
  constructor(@InjectModel(Stuff) private stuffRepo: typeof Stuff) {}

  async create(createStuffDto: CreateStuffDto) {
    return 'This action adds a new stuff';
  }

  async findAll() {
    return `This action returns all stuffs`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} stuff`;
  }

  async update(id: number, updateStuffDto: UpdateStuffDto) {
    return `This action updates a #${id} stuff`;
  }

  async remove(id: number) {
    return `This action removes a #${id} stuff`;
  }
}
