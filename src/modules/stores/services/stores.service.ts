import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { StoreEntity } from '../../../core/entities/store.entity';
import { CacheService } from '../../../core/services/cache.service';
import { ICreationService } from '../../../core/types';
import { CreationAttributes } from 'sequelize';

@Injectable()
export class StoresService implements ICreationService<StoreEntity> {
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

  async create(attrs: CreationAttributes<any>) {
    return this.storeEntity.create(attrs);
  }
}
