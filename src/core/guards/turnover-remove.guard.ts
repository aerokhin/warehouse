import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
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
    const badIds: string[] = [];

    for (const productId of productIds) {
      const additions = await this.turnoversService.quantityBySectionProductActionSize(section.id, productId.id, TurnoverAction.add, productId.size);
      const removals = await this.turnoversService.quantityBySectionProductActionSize(section.id, productId.id, TurnoverAction.remove, productId.size);

      if (additions - removals <= 0) {
        badIds.push(productId.raw);
      }
    }

    if (badIds.length > 0) {
      throw new BadRequestException({
        message: 'Some products do not exist in the given section',
        ids: badIds
      });
    }

    return true;
  }
}
