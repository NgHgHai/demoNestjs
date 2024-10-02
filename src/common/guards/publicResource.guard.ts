import { CanActivate, ExecutionContext, Injectable, } from '@nestjs/common';


@Injectable()
export class PublicResourceGuard implements CanActivate {
    constructor() { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        return true;
    }
}