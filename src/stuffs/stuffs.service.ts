import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStuffDto } from './dto/create-stuff.dto';
import { UpdateStuffDto } from './dto/update-stuff.dto';
import { Stuff } from './entities/stuff.entity';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from '../files/files.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import { LoginStuffDto } from './dto/loginStuff.dto';

@Injectable()
export class StuffsService {
  constructor(
    @InjectModel(Stuff) private stuffRepo: typeof Stuff,
    private fileService: FilesService,
    private jwtService: JwtService,
  ) {}

  async create(createStuffDto: CreateStuffDto) {
    const phn = createStuffDto.phone_number || "";
    const candidate = await this.stuffRepo.findOne({
      where: {
        [Op.or]: [
          { phone_number: phn },
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
    const usern = updateStuffDto.username || "";
    const phn = updateStuffDto.phone_number || "";
    const candidate = await this.stuffRepo.findOne({
      where:{
        [Op.or] : [
          {phone_number: usern},
          {username: phn}
        ]
      }
    })
    if (
      (candidate && candidate.id !== id)
    ) {
      throw new BadRequestException('stuff already exists');
    }


    let password = stuff.password;
    if (updateStuffDto.password) {
      password = await bcrypt.hash(updateStuffDto.password, 7);
    }
    await stuff.update({
      ...updateStuffDto,
      password: password,
    });
    await stuff.save()
    return stuff;
  }

  async remove(id: number) {
    await this.stuffRepo.destroy({
      where:{
        id:id
      }
    })
    return { status:200, message: 'Successfully deleted' };
  }

  async login(loginStuffDto: LoginStuffDto) {
    const { username, password } = loginStuffDto;
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
    );
    stuff.token = tokens.refresh_token;
    await stuff.save();
    const resp = {
      status:200,
      stuff_id: stuff.id,
      access_token: tokens.access_token
    }
    console.log(resp)
    return resp;
  }

  async getTokens(id: number, role_id: number) {
    const jwtPayload = {
      id: id,
      role_id: role_id
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
