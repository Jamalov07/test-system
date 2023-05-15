import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Group } from './entities/group.entity';

@Injectable()
export class GroupsService {
  constructor(@InjectModel(Group) private groupRepo: typeof Group) {}

  async create(createGroupDto: CreateGroupDto) {
    return 'This action adds a new group';
  }

  async findAll() {
    return `This action returns all groups`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  async remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
