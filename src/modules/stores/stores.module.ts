import { Module } from '@nestjs/common';
import { StoresService } from './services/stores.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { StoreEntity } from '../../core/entities/store.entity';
import { CacheService } from '../../core/services/cache.service';

@Module({
  imports: [
    SequelizeModule.forFeature([ StoreEntity ]),
  ],
  providers: [ CacheService, StoresService ],
  exports: [ StoresService ]
})
export class StoresModule {
}
