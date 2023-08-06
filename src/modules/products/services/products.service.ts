import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CacheService } from '../../../core/services/cache.service';
import { ProductEntity } from '../../../core/entities/product.entity';
import { IProductId } from '../types';
import { TurnoversService } from '../../turnovers/services/turnovers.service';
import { SectionsService } from '../../sections/services/sections.service';
import { IProductLocation } from '../../../core/types';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(ProductEntity) private productEntity: typeof ProductEntity,
    private readonly cacheService: CacheService,
    private readonly turnoversService: TurnoversService,
    private readonly sectionsService: SectionsService
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

  async findByIds(ids: number[]): Promise<ProductEntity[]> {
    return this.productEntity.findAll({
      where: {
        id: ids,
        enabled: true
      }
    });
  }

  async findLocations(productId: IProductId, quantity: number) {
    const { id, size } = productId;
    const items = await this.turnoversService.findAvailableByQuantity(id, size);
    const result: IProductLocation[] = [];
    let sum = 0;

    for (const item of items) {
      const sectionId = +item.dataValues['section_id'];
      const total = +item.dataValues['total'];
      const amount = (sum + total) > quantity ? (quantity - sum) : total;
      sum += amount;

      const section = await this.sectionsService.findByPk(sectionId);
      result.push({
        amount,
        section: `${section.rack.alias}-${section.sectionNo}`,
      });

      if (sum >= quantity) {
        break;
      }
    }

    return result;
  }
}
