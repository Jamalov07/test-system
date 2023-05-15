import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStuffDto } from './dto/create-stuff.dto';
import { UpdateStuffDto } from './dto/update-stuff.dto';
import { Stuff } from './entities/stuff.entity';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from '../files/files.service';

@Injectable()
export class StuffsService {
  constructor(
    @InjectModel(Stuff) private stuffRepo: typeof Stuff,
    private fileService: FilesService,
  ) {}

  async create(createStuffDto: CreateStuffDto, image: any) {
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

    let fileName: string = '';
    if (image) {
      fileName = await this.fileService.createFile(image);
    }

    const newStuff = await this.stuffRepo.create({
      ...createStuffDto,
      image: fileName,
    });
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

  async update(id: number, updateStuffDto: UpdateStuffDto, image) {
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

    let fileName: string = '';
    if (image) {
      await this.fileService.deleteFile(stuff.image);
      fileName = await this.fileService.createFile(image);
    }

    await stuff.update({ ...updateStuffDto, image: fileName || stuff.image });
    return stuff;
  }

  async remove(id: number) {
    const stuff = await this.findOne(id);
    await this.fileService.deleteFile(stuff.image)
    await stuff.destroy();
    return { message: 'stuff deleted' };
  }
}
