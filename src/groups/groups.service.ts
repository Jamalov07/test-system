import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Group } from './entities/group.entity';

@Injectable()
export class GroupsService {
  constructor(@InjectModel(Group) private groupRepo: typeof Group) {}

  async create(createGroupDto: CreateGroupDto) {
    const candidate = await this.groupRepo.findOne({
      where: { name: createGroupDto.name },
      include: { all: true, nested: true }
    });
    if (candidate) {
      throw new BadRequestException('This group already exists');
    }
    const newGroup = await this.groupRepo.create(createGroupDto);
    return newGroup;
  }

  async findAll() {
    const groups = await this.groupRepo.findAll({ include: { all: true, nested: true }});
    return groups;
  }

  async findOne(id: number) {
    const group = await this.groupRepo.findOne({ where: { id } , include: { all: true, nested: true }});
    if (!group) {
      throw new BadRequestException('Group not found');
    }
    return group;
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    const group = await this.findOne(id);
    if (updateGroupDto.name) {
      const candidate = await this.groupRepo.findOne({
        where: { name: updateGroupDto.name },
        include: { all: true, nested: true }
      });
      if (candidate && candidate.id !== id) {
        throw new BadRequestException('This group already exists');
      }
    }
    await group.update(updateGroupDto);
    return group;
  }

  async remove(id: number) {
    const group = await this.findOne(id);
    await group.destroy();
    return { message: 'group deleted' };
  }
}
