import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStuffDto } from './dto/create-stuff.dto';
import { UpdateStuffDto } from './dto/update-stuff.dto';
import { Stuff } from './entities/stuff.entity';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from '../files/files.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Role } from '../roles/entities/role.entity';
import { Op } from 'sequelize';

@Injectable()
export class StuffsService {
  constructor(
    @InjectModel(Stuff) private stuffRepo: typeof Stuff,
    @InjectModel(Role) private roleRepo: typeof Role,
    private fileService: FilesService,
    private jwtService: JwtService,
  ) {}

  async create(createStuffDto: CreateStuffDto) {
    let role_id = createStuffDto.role_id;

    const candidate = await this.stuffRepo.findOne({
      where: {
        [Op.or]: [
          { phone_number: createStuffDto.phone_number },
          { username: createStuffDto.username },
        ],
      },
    });
    if (candidate) {
      throw new BadRequestException('Stuff already exists');
    }

    const hashed = await bcrypt.hash(createStuffDto.password, 7);

    const newStuff = await this.stuffRepo.create({
      ...createStuffDto,
      password: hashed,
      role_id: role_id,
    });

    return newStuff;
  }

  async findAll() {
    const stuffs = await this.stuffRepo.findAll({ include: { all: true, nested: true }});
    return stuffs;
  }

  async findOne(id: number) {
    const stuff = await this.stuffRepo.findOne({ where: { id }, include: { all: true, nested: true } });
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


    let password = stuff.password;
    if (updateStuffDto.password) {
      password = await bcrypt.hash(updateStuffDto.password, 7);
    }

    await stuff.update({
      ...updateStuffDto,
      image: updateStuffDto.image,
      password: password,
    });
    return stuff;
  }

  async remove(id: number) {
    const stuff = await this.findOne(id);
    await this.fileService.deleteFile(stuff.image);
    await stuff.destroy();
    return { message: 'stuff deleted' };
  }

  async login(authBody: { username: string; password: string }) {
    const { username, password } = authBody;
    const stuff = await this.stuffRepo.findOne({
      where: { username },
      include: { all: true, nested: true }
    });
    if (!stuff) {
      throw new BadRequestException('Incorrect username');
    }
    const correct_password = await bcrypt.compare(password, stuff.password);
    if (!correct_password) {
      throw new BadRequestException('Incorrect password');
    }

    const tokens = await this.getTokens(
      stuff.id,
      stuff.role_id,
      stuff.role.name,
    );

    return { stuff, tokens };
  }

  async getTokens(id: number, role_id: number, role_name: string) {
    const jwtPayload = {
      id: id,
      role_id: role_id,
      role_name: role_name,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });

      if (data) {
        if (data.id && data.role_id) {
          const stuff = await this.stuffRepo.findOne({
            where: { id: data.id },
            include: { all: true, nested: true }
          });
          if (stuff) {
            return {
              isValid: true,
              tokenData: data,
              stuff: stuff,
            };
          }
        }
      }
      return { isValid: false };
    } catch (error) {
      return { isValid: false, message: error };
    }
  }
}
