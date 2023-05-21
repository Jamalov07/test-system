import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepo: typeof Role) {}

  async create(createRoleDto: CreateRoleDto) {
    const candidate = await this.roleRepo.findOne({
      where: { name: createRoleDto.name },
      include: { all: true, nested: true }
    });
    if (candidate) {
      throw new BadRequestException('This role already exists');
    }
    const newRole = await this.roleRepo.create(createRoleDto);
    return newRole;
  }

  async findAll() {
    const roles = await this.roleRepo.findAll({ include: { all: true, nested: true }});
    return roles;
  }

  async findOne(id: number) {
    const role = await this.roleRepo.findOne({ where: { id }, include: { all: true, nested: true } });
    if (!role) {
      throw new BadRequestException('Role not found');
    }
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.findOne(id);
    if (updateRoleDto.name) {
      const candidate = await this.roleRepo.findOne({
        where: { name: updateRoleDto.name },
        include: { all: true, nested: true }
      });
      if (candidate && candidate.id !== id) {
        throw new BadRequestException('This role already exists');
      }
    }
    await role.update(updateRoleDto);
    return role;
  }

  async remove(id: number) {
    const role = await this.findOne(id);
    await role.destroy();
    return { message: 'role deleted' };
  }
}
