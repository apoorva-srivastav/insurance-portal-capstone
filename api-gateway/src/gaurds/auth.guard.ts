import {
  Injectable,
  Inject,
  CanActivate,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy,
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const secured = this.reflector.get<string[]>(
      'secured',
      context.getHandler(),
    );

    if (!secured) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      return false;
    }
    // Bearer <token-string>

    const userTokenInfo = await firstValueFrom(this.authServiceClient.send('token_decode', {
        token: request.headers.authorization?.split(' '),
      }));
//  console.log('token val>>>>', request.headers.authorization?.split(' '))
//        console.log('user>>>>', userTokenInfo, userTokenInfo.data.payload.userId)
    const userInfo = await firstValueFrom(this.userServiceClient.send('user_search_by_id', userTokenInfo.data.payload.userId));

    //console.log('user info>>>>', userInfo)
    request.user = userInfo;
    return true;
  }

  // private extractTokenFromHeader(request: Request): string | undefined {
  //   const [type, token] = request.headers.authorization?.split(' ') ?? [];
  //   return type === 'Bearer' ? token : undefined;
  // }
}
