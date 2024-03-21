import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
export declare class AuthGuard implements CanActivate {
    private readonly reflector;
    private readonly authServiceClient;
    private readonly userServiceClient;
    constructor(reflector: Reflector, authServiceClient: ClientProxy, userServiceClient: ClientProxy);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
