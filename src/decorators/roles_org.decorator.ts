// import {
//   createParamDecorator,
//   ExecutionContext,
//   ForbiddenException,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';

// // decorator for all routes

// export const PermissionRoles = createParamDecorator(
//   async (roles: Array<String>, ctx: ExecutionContext) => {
//     const request = ctx.switchToHttp().getRequest();
//     const authorization = request.headers.authorization;

//     if (!authorization) {
//       throw new UnauthorizedException('stuff unauthorized');
//     }
//     const refresh_token = authorization.split(' ')[1];
//     if (!refresh_token) {
//       throw new UnauthorizedException('stuff unauthorized');
//     }
//     let stuffdata: any;

//     try {
//       stuffdata = await new JwtService().verify(refresh_token, {
//         secret: process.env.ACCESS_TOKEN_KEY,
//       });
//     } catch (error) {
//       throw new ForbiddenException(error.message);
//     }

//     if (
//       stuffdata &&
//       stuffdata.role_name &&
//       roles.includes(stuffdata.role_name)
//     ) {
//       return 'ok';
//     }
//     throw new UnauthorizedException('Permission denied');
//   },
// );
