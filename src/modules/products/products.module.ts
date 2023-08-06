import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { CacheService } from '../../core/services/cache.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductEntity } from '../../core/entities/product.entity';
import { TurnoversModule } from '../turnovers/turnovers.module';
import { SectionsModule } from '../sections/sections.module';
import { ProductsController } from './controllers/products.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([ ProductEntity ]),
    SectionsModule,
    TurnoversModule
  ],
  providers: [ CacheService, ProductsService ],
  exports: [ ProductsService ],
  controllers: [ ProductsController ]
})
export class ProductsModule {
}
