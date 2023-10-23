import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Request } from 'express';
import { Observable } from 'rxjs';
import commonConfig from 'src/common/config/common.config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    @Inject(commonConfig.KEY)
    private readonly appConfiguration: ConfigType<typeof commonConfig>, // private readonly configService: ConfigService,
  ) {}
  // return a Boolean, indicating whether the current request is allowed to proceed OR denied access.
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Authorization');
    return authHeader == this.appConfiguration.apiKey;
  }
}
