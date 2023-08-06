import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { StoreEntity } from '../../../core/entities/store.entity';
import { CacheService } from '../../../core/services/cache.service';

@Injectable()
export class StoresService {
  constructor(
    @InjectModel(StoreEntity) private storeEntity: typeof StoreEntity,
    private readonly cacheService: CacheService
  ) {
  }

  async findDefaultStore() {
    return this.cacheService.assign<StoreEntity>(
      'db/stores/default',
      async () => this.storeEntity.findOne()
    );
  }
}
