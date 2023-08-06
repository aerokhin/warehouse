import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { CacheService } from '../../core/services/cache.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductEntity } from '../../core/entities/product.entity';
import { TurnoversModule } from '../turnovers/turnovers.module';
import { SectionsModule } from '../sections/sections.module';

@Module({
  imports: [
    SequelizeModule.forFeature([ ProductEntity ]),
    TurnoversModule,
    SectionsModule
  ],
  providers: [ CacheService, ProductsService ],
  exports: [ ProductsService ]
})
export class ProductsModule {
}
