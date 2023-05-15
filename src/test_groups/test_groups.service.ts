import { Injectable } from '@nestjs/common';
import { CreateTestGroupDto } from './dto/create-test_group.dto';
import { UpdateTestGroupDto } from './dto/update-test_group.dto';
import { TestGroup } from './entities/test_group.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TestGroupsService {
  constructor(
    @InjectModel(TestGroup) private testgroupRepo: typeof TestGroup,
  ) {}

  async create(createTestGroupDto: CreateTestGroupDto) {
    return 'This action adds a new testGroup';
  }

  async findAll() {
    return `This action returns all testGroups`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} testGroup`;
  }

  async update(id: number, updateTestGroupDto: UpdateTestGroupDto) {
    return `This action updates a #${id} testGroup`;
  }

  async remove(id: number) {
    return `This action removes a #${id} testGroup`;
  }
}
