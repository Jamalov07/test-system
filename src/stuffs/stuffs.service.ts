import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStuffDto } from './dto/create-stuff.dto';
import { UpdateStuffDto } from './dto/update-stuff.dto';
import { Stuff } from './entities/stuff.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class StuffsService {
  constructor(@InjectModel(Stuff) private stuffRepo: typeof Stuff) {}

  async create(createStuffDto: CreateStuffDto) {
    const candidate1 = await this.stuffRepo.findOne({
      where: {
        phone_number: createStuffDto.phone_number,
      },
    });
    const candidate2 = await this.stuffRepo.findOne({
      where: {
        username: createStuffDto.username,
      },
    });
    if (candidate1 || candidate2) {
      throw new BadRequestException('student already exists');
    }

    const newStuff = await this.stuffRepo.create(createStuffDto);
    return newStuff;
  }

  async findAll() {
    const stuffs = await this.stuffRepo.findAll();
    return stuffs;
  }

  async findOne(id: number) {
    const stuff = await this.stuffRepo.findOne({ where: { id } });
    if (!stuff) {
      throw new BadRequestException('stuff not found');
    }
    return stuff;
  }

  async update(id: number, updateStuffDto: UpdateStuffDto) {
    const stuff = await this.findOne(id);

    const candidate1 = await this.stuffRepo.findOne({
      where: {
        phone_number: updateStuffDto.phone_number || stuff.phone_number,
      },
    });
    const candidate2 = await this.stuffRepo.findOne({
      where: {
        username: updateStuffDto.username || stuff.username,
      },
    });
    if (
      (candidate1 && candidate1.id !== id) ||
      (candidate2 && candidate2.id !== id)
    ) {
      throw new BadRequestException('stuff already exists');
    }

    await stuff.update(updateStuffDto);
    return stuff;
  }

  async remove(id: number) {
    const stuff = await this.findOne(id);
    await stuff.destroy();
    return { message: 'stuff deleted' };
  }
}
