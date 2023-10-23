import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { Request } from 'express';
import { Observable } from 'rxjs';
// import appConfig from 'src/config/app.config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    // @Inject(appConfig.KEY)
    // private readonly appConfiguration: ConfigType<typeof appConfig>,
    private readonly configService: ConfigService,
  ) {
    // console.log(this.appConfiguration.apiKey);
  }
  // return a Boolean, indicating whether the current request is allowed to proceed OR denied access.
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Authorization');
    // return authHeader == this.appConfiguration.apiKey;
    return authHeader == this.configService.get('API_KEY');
  }
}
