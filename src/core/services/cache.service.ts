import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheTtl } from '../types';

@Injectable()
export class CacheService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {
  }

  async assign<T>(key: string, valueGetter: () => Promise<T>, ms = CacheTtl.day): Promise<T> {
    if (!this.cacheManager || !this.cacheManager.get) {
      return valueGetter();
    }

    const cacheValue = await this.cacheManager.get<T>(key);

    if (cacheValue) {
      return cacheValue;
    }

    const value = await valueGetter();

    if (value) {
      await this.cacheManager.set(key, value, ms);
    }

    return value;
  }

}
