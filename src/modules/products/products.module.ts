import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { CacheService } from '../../core/services/cache.service';

@Module({
  providers: [ CacheService, ProductsService ],
  exports: [ ProductsService ]
})
export class ProductsModule {
}
