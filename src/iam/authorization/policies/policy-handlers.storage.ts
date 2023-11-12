import { Injectable, Type } from '@nestjs/common';
import { PolicyHandler } from './interfaaces/policy-handler.interface';
import { Policy } from './interfaaces/policy.interface';

@Injectable()
export class PolicyHandlerStorage {
  private readonly collection = new Map<Type<Policy>, PolicyHandler<any>>();

  add<T extends Policy>(policyCls: Type<T>, handler: PolicyHandler<T>) {
    this.collection.set(policyCls, handler);
  }

  get<T extends Policy>(policyCls: Type<T>) {
    const handler = this.collection.get(policyCls);
    if (!handler) {
      throw new Error(`"${policyCls.name}" does not have a handler!`);
    }
    return handler;
  }
}
