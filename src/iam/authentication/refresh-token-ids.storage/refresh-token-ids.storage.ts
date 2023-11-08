import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { Redis } from 'ioredis';

export class InvalidatedRefreshTokenError extends Error {}

@Injectable()
export class RefreshTokenIdsStorage
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private redisClient: Redis;
  onApplicationBootstrap() {
    // move this to dedicated RediModule
    this.redisClient = new Redis({
      // use env variables
      host: 'localhost',
      port: 6379,
    });
  }
  onApplicationShutdown() {
    return this.redisClient.quit();
  }
  async insert(userId: string, tokenId: string): Promise<void> {
    await this.redisClient.set(this.getkey(userId), tokenId);
  }
  async validate(userId: string, tokenId: string): Promise<boolean> {
    const storedId = await this.redisClient.get(this.getkey(userId));
    if (storedId !== tokenId) {
      throw new InvalidatedRefreshTokenError();
    }
    return storedId === tokenId;
  }
  async invalidate(userId: string): Promise<void> {
    this.redisClient.del(userId);
  }
  private getkey(userId: string): string {
    return `user-${userId}`;
  }
}
