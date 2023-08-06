import { Module } from '@nestjs/common';
import { StoresController } from './controllers/stores.controller';
import { StoresService } from './services/stores.service';
import { SectionsModule } from '../sections/sections.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { StoreEntity } from '../../core/entities/store.entity';
import { CacheService } from '../../core/services/cache.service';
import { ProductsModule } from '../products/products.module';
import { TurnoversModule } from '../turnovers/turnovers.module';

@Module({
  imports: [
    SequelizeModule.forFeature([ StoreEntity ]),
    SectionsModule,
    ProductsModule,
    TurnoversModule
  ],
  controllers: [ StoresController ],
  providers: [ CacheService, StoresService ],
  exports: [ StoresService ]
})
export class StoresModule {
}
