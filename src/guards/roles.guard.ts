import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "../decorators/roles";



@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector
  ) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    console.log(requiredRoles);
    if (!requiredRoles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    // tokenni verify qilganida tokendagi role_id si bilan requiredRolesda kelgan id ni solishtirib korish
    if (!authHeader) {
      throw new UnauthorizedException({
        message: "Foydalanuvchi avtorizatsiyadan o'tmagan",
      })
    }
    
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException({
        message: "Foydalanuvchi avtorizatsiyadan o'tmagan",
      })
    }
    let user: any;
    try {
      user = this.jwtService.verify(token,{secret:process.env.ACCESS_TOKEN_KEY})
    } catch (error) {
      throw new UnauthorizedException({
        message: "Foydalanuvchi avtorizatsiyadan o'tmagan",
      })
    }
    console.log(requiredRoles,user.role_id);
    req.user = user;
    if (user.role_id != requiredRoles[0]) {
      throw new ForbiddenException({
        message: "Sizga ruxsat etilmagan"
      });
    }

    return true;
  }
}