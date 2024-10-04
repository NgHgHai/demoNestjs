import { CanActivate, ExecutionContext, Injectable, } from '@nestjs/common';
import { Reflector } from '@nestjs/core';


@Injectable()
export class PublicResourceGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);
        console.log('PublicResourceGuard: isPublic');
        console.log(isPublic);
        if (isPublic) {
            return true;
        }
        return false;
    }
}