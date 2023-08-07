import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { HttpUtil } from '../utils/http.util';
import { SectionEntity } from '../entities/section.entity';
import { IProductId } from '../../modules/products/types';
import { TurnoversService } from '../../modules/turnovers/services/turnovers.service';
import { TurnoverAction } from '../types';

@Injectable()
export class TurnoverRemoveGuard implements CanActivate {

  constructor(
    private readonly turnoversService: TurnoversService
  ) {
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const { req } = HttpUtil.getHttpObjects(context);
    const section = HttpUtil.getRequestData<SectionEntity>(req, 'section');
    const productIds = HttpUtil.getRequestData<IProductId[]>(req, 'productIds');
    const ids = Object.values(productIds.reduce((acc, productId) => {
      if (!acc[productId.raw]) {
        acc[productId.raw] = [ productId, 0 ];
      }
      acc[productId.raw][1]++;

      return acc;
    }, {}));
    const badIds: string[] = [];

    for (const item of ids) {
      const [ productId, count ] = item as any;
      const additions = (await this.turnoversService.quantityBySectionProductActionSize(section.id, productId.id, TurnoverAction.add, productId.size)) || 0;
      const removals = (await this.turnoversService.quantityBySectionProductActionSize(section.id, productId.id, TurnoverAction.remove, productId.size)) || 0;

      if (additions - removals - count < 0) {
        badIds.push(productId.raw);
      }
    }

    if (badIds.length > 0) {
      throw new BadRequestException({
        message: 'Some product counts are higher than the actual count in the section.',
        ids: badIds
      });
    }

    return true;
  }
}
