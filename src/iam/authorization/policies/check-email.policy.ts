import { Injectable } from '@nestjs/common';
import { Policy } from './interfaaces/policy.interface';
import { PolicyHandler } from './interfaaces/policy-handler.interface';
import { ActiveUserData } from 'src/iam/interfaces/active-user.interface';
import { PolicyHandlerStorage } from './policy-handlers.storage';

export class CheckEmailPolicy implements Policy {
  name = 'CheckEmail';
}

@Injectable()
export class CheckEmailPolicyHandler
  implements PolicyHandler<CheckEmailPolicy>
{
  constructor(private readonly policyHandlerStorage: PolicyHandlerStorage) {
    this.policyHandlerStorage.add(CheckEmailPolicy, this);
  }
  async handle(policy: CheckEmailPolicy, user: ActiveUserData): Promise<void> {
    const isOneOfUs = user.email.endsWith('@test.com');
    if (!isOneOfUs) {
      throw new Error('User is not one of us');
    }
  }
}
