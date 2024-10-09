import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Role } from "../enums/role.enum";
import { ROLES_KEY } from "../decorator/roles.decorator";
import { Request } from "express";


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private jwtService: JwtService
    ) { }


    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ]);
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!requiredRoles) {
            return true;
        }
        if (!token) {
            throw new UnauthorizedException('You are not authorized to access this resource');
        }
        const user = this.jwtService.verify(token);
        const isAllowed = requiredRoles.includes(user.role);
        console.log('RolesGuard: user:',user.role);
        console.log('RolesGuard: requiredRoles:',requiredRoles);
        request.user = user;
        if (!isAllowed) {
            throw new UnauthorizedException('You are not allowed to access this resource');
        }
        console.log('RolesGuard: isAllowed ');
        console.log(isAllowed);
        console.log('requiredRoles:',requiredRoles);
        console.log('role:',user.role);
        return requiredRoles.includes(user.role);
    }


    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

}