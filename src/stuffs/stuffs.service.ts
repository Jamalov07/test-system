import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStuffDto } from './dto/create-stuff.dto';
import { UpdateStuffDto } from './dto/update-stuff.dto';
import { Stuff } from './entities/stuff.entity';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from '../files/files.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Role } from '../roles/entities/role.entity';

@Injectable()
export class StuffsService {
  constructor(
    @InjectModel(Stuff) private stuffRepo: typeof Stuff,
    @InjectModel(Role) private roleRepo: typeof Role,
    private fileService: FilesService,
    private jwtService: JwtService,
  ) {}

  async create(createStuffDto: CreateStuffDto, image: any, command: string) {
    let role_id = createStuffDto.role_id;
    if (command === 'first') {
      const newRole = await this.roleRepo.create({
        name: 'SUPERADMIN',
        description: 'CREATOR',
      });
      role_id = newRole.id;
    }

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
    const hashed = await bcrypt.hash(createStuffDto.password, 7);

    const newStuff = await this.stuffRepo.create({
      ...createStuffDto,
      image: fileName,
      password: hashed,
      role_id: role_id,
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

    let fileName: string = stuff.image;
    if (image) {
      await this.fileService.deleteFile(stuff.image);
      fileName = await this.fileService.createFile(image);
    }

    let password = stuff.password;
    if (updateStuffDto.password) {
      password = await bcrypt.hash(updateStuffDto.password, 7);
    }

    await stuff.update({
      ...updateStuffDto,
      image: fileName,
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
      include: { all: true },
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
            include: { all: true },
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
