import { BadRequestException, Injectable } from '@nestjs/common';
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
    if (![15, 30, 45].includes(createTestGroupDto.tests_count)) {
      throw new BadRequestException('only 15, 30, 45 tests in test group');
    }
    const newTestGroup = await this.testgroupRepo.create(createTestGroupDto);
    return newTestGroup;
  }

  async findAll() {
    const testgroups = await this.testgroupRepo.findAll({
      include: { all: true, nested: true },
    });
    return testgroups;
  }

  async findOne(id: number) {
    const testgroup = await this.testgroupRepo.findOne({
      where: { id },
      include: { all: true, nested: true },
    });
    if (!testgroup) {
      throw new BadRequestException('Test group not found');
    }
    return testgroup;
  }

  async update(id: number, updateTestGroupDto: UpdateTestGroupDto) {
    const testgroup = await this.findOne(id);
    if (updateTestGroupDto.tests_count) {
      if (![15, 30, 45].includes(updateTestGroupDto.tests_count)) {
        throw new BadRequestException('only 15, 30, 45 tests in test group');
      }
    }
    await testgroup.update(updateTestGroupDto);
    return testgroup;
  }

  async remove(id: number) {
    const testgroup = await this.findOne(id);
    await testgroup.destroy();
    return { message: 'test group deleted' };
  }
}
