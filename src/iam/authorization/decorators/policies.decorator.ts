import { SetMetadata } from '@nestjs/common';
import { Policy } from '../policies/interfaaces/policy.interface';

export const PLOICIES_KEY = 'policies';

export const Policies = (...policies: Policy[]) =>
  SetMetadata(PLOICIES_KEY, policies);
