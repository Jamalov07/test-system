import { Injectable } from '@nestjs/common';
import { CreateTestGroupDto } from './dto/create-test_group.dto';
import { UpdateTestGroupDto } from './dto/update-test_group.dto';

@Injectable()
export class TestGroupsService {
  create(createTestGroupDto: CreateTestGroupDto) {
    return 'This action adds a new testGroup';
  }

  findAll() {
    return `This action returns all testGroups`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testGroup`;
  }

  update(id: number, updateTestGroupDto: UpdateTestGroupDto) {
    return `This action updates a #${id} testGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} testGroup`;
  }
}
