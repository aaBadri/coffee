import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import commonConfig from 'src/common/config/common.config';
import { IS_PUBLIC } from 'src/common/decorators/public.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    @Inject(commonConfig.KEY)
    private readonly appConfiguration: ConfigType<typeof commonConfig>, // private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}
  // return a Boolean, indicating whether the current request is allowed to proceed OR denied access.
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC, context.getHandler());
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Authorization');
    return authHeader == this.appConfiguration.apiKey;
  }
}
