import { CanActivate, ExecutionContext, HttpException, Injectable, Req } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { JwtService } from "@nestjs/jwt";



@Injectable()
export class PublicResourceGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);

        console.log('PublicResourceGuard: isPublic');
        console.log('public ?: ',isPublic);
        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new HttpException('You are not authorized to access this resource', 401);
        } else {
            console.log('PublicResourceGuard: token: yes');
            const user = this.jwtService.verify(token);
            request.user = user;
            //console.log(user);
            return true;
        }

    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}