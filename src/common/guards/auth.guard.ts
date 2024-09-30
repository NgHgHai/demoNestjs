import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            // TODO: nên để message trong một file constant
            throw new UnauthorizedException('You are not authorized to access this resource');
        }
        try {
            console.log(token);
            const payload = this.jwtService.verify(token);
            request.user = payload;
            console.log(payload);
            return true;
        } catch (error) {
             // TODO: nên để message trong một file constant
            throw new UnauthorizedException('You are not authorized to access this resource');
        }

    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}