import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Type,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Policy } from '../policies/interfaaces/policy.interface';
import { REQUEST_USER_KEY } from 'src/iam/iam.constants';
import { ActiveUserData } from 'src/iam/interfaces/active-user.interface';
import { PLOICIES_KEY } from '../decorators/policies.decorator';
import { PolicyHandlerStorage } from '../policies/policy-handlers.storage';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly policyHandlerStorage: PolicyHandlerStorage,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const contextPolicies = this.reflector.getAllAndOverride<Policy[]>(
      PLOICIES_KEY,
      // you can set it on the class or method
      [context.getHandler(), context.getClass()],
    );
    if (contextPolicies) {
      const user: ActiveUserData = context.switchToHttp().getRequest()[
        REQUEST_USER_KEY
      ];
      await Promise.all(
        contextPolicies.map((policy) => {
          const policyHandler = this.policyHandlerStorage.get(
            policy.constructor as Type,
          );
          return policyHandler.handle(policy, user);
        }),
      ).catch((error) => {
        throw new ForbiddenException(error.message);
      });
    }
    return true;
  }
}
