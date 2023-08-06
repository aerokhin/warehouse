import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CacheService } from '../../../core/services/cache.service';
import { ProductEntity } from '../../../core/entities/product.entity';
import { Size } from '../../../core/types';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(ProductEntity) private productEntity: typeof ProductEntity,
    private readonly cacheService: CacheService
  ) {
  }

  async findByPk(id: number): Promise<ProductEntity> {
    return this.cacheService.assign<ProductEntity>(
      `db/products/${id}`,
      async () => {
        return this.productEntity.findByPk(id)
      }
    )
  }
}
