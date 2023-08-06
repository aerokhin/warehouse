import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TurnoversService } from '../../modules/turnovers/services/turnovers.service';
import { HttpUtil } from '../utils/http.util';
import { SectionEntity } from '../entities/section.entity';
import { IProductId } from '../../modules/products/types';

@Injectable()
export class TurnoverAddGuard implements CanActivate {

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
    const occupancy = await this.turnoversService.getOccupancy(section.id);

    if (section.capacity - occupancy < productIds.length) {
      throw new BadRequestException({
        message: 'The section\'s storage capacity is insufficient for the given amount of products'
      });
    }

    return true;
  }
}
