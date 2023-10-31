import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AUTH_TYPE_KEY } from '../../decorators/auth.decorator';
import { AccessTokenGuard } from '../access-token/access-token.guard';
import { AuthType } from '../../enums/auth-type.enum';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly accessTokenGuard: AccessTokenGuard,
    private readonly reflector: Reflector,
  ) {}

  private static readonly defaultAuthType = AuthType.Bearer;
  // map from authtype to canactivate function
  private readonly authTypeMap: Record<AuthType, CanActivate | CanActivate[]> =
    {
      [AuthType.Bearer]: this.accessTokenGuard,
      [AuthType.None]: { canActivate: () => true },
    };
  // return a Boolean, indicating whether the current request is allowed to proceed OR denied access.
  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('Auth GUARD');

    // read the input to Auth() decorator. it can be an array of authTypes. if none we set a default
    const authTypes = this.reflector.getAllAndOverride<AuthType[]>(
      AUTH_TYPE_KEY,
      // you can set it on the class or method
      [context.getHandler(), context.getClass()],
    ) ?? [AuthenticationGuard.defaultAuthType];

    // gives us array of CanActivate to call them one by one
    const guards = authTypes.map((type) => this.authTypeMap[type]).flat();
    let error = new UnauthorizedException();

    for (const guard of guards) {
      const isAllowed = await Promise.resolve(guard.canActivate(context)).catch(
        (err) => {
          error = err;
        },
      );
      if (isAllowed) {
        return true;
      }
    }
    throw error;
  }
}
