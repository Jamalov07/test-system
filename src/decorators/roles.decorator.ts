import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { StuffsService } from '../stuffs/stuffs.service';
import { Stuff } from '../stuffs/entities/stuff.entity';
import { FilesService } from '../files/files.service';
import { Role } from '../roles/entities/role.entity';


// decorator for create first stuff

export const Roles = createParamDecorator(
  async (roles: Array<String>, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    const stuffs = await new StuffsService(
      Stuff,
      Role,
      new FilesService(),
      new JwtService(),
    ).findAll();

    if (!stuffs.length) {
      return 'first';
    } else {
      if (!authorization) {
        throw new UnauthorizedException('stuff unauthorized');
      }
      const refresh_token = authorization.split(' ')[1];
      if (!refresh_token) {
        throw new UnauthorizedException('stuff unauthorized');
      }
      let stuffdata: any;

      try {
        stuffdata = await new JwtService().verify(refresh_token, {
          secret: process.env.ACCESS_TOKEN_KEY,
        });
      } catch (error) {
        throw new ForbiddenException(error.message);
      }

      if (
        stuffdata &&
        stuffdata.role_name &&
        roles.includes(stuffdata.role_name)
      ) {
        return 'ok';
      }
      throw new UnauthorizedException('Permission denied');
    }
  },
);
