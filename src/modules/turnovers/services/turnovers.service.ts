import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Size, TurnoverAction } from '../../../core/types';
import { TurnoverEntity } from '../../../core/entities/turnover.entity';
import { IProductId } from '../../products/types';
import { TurnoverDto } from '../../../core/dto/turnover.dto';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class TurnoversService {
  constructor(
    @InjectModel(TurnoverEntity) private turnoverEntity: typeof TurnoverEntity
  ) {
  }

  async findAvailableByQuantity(productId: number, size: Size) {
    const sumExpression = `SUM(IF(action = '${TurnoverAction.add}', quantity, -1 * quantity))`;

    return this.turnoverEntity.findAll({
      attributes: [
        'section_id',
        'product_id',
        'size',
        [ Sequelize.literal(sumExpression), 'total' ],
      ],
      where: {
        productId,
        size
      },
      group: [ 'section_id', 'product_id' ],
      // having: Sequelize.literal(`${sumExpression} <= ${quantity}`),
      order: [
        [ 'total', 'ASC' ]
      ]
    });
  }

  async quantityBySectionAction(sectionId: number, action: TurnoverAction) {
    return this.turnoverEntity.sum('quantity', {
      where: {
        sectionId,
        action
      }
    });
  }

  async quantityBySectionProductActionSize(sectionId: number, productId: number, action: TurnoverAction, size: Size) {
    return this.turnoverEntity.sum('quantity', {
      where: {
        sectionId,
        productId,
        action,
        size
      }
    });
  }

  async quantityByProductActionSize(productId: number, action: TurnoverAction, size: Size) {
    return this.turnoverEntity.sum('quantity', {
      where: {
        productId,
        action,
        size
      }
    });
  }

  async getOccupancy(sectionId: number) {
    const additions = await this.quantityBySectionAction(sectionId, TurnoverAction.add);
    const removals = await this.quantityBySectionAction(sectionId, TurnoverAction.remove);

    return additions - removals;
  }

  async bulkInsertProducts(sectionId: number, productIds: IProductId[], action: TurnoverAction) {
    const turnovers = await this.turnoverEntity.bulkCreate(productIds.map(productId => ({
      sectionId,
      action,
      productId: productId.id,
      quantity: 1,
      size: productId.size,
      meta: JSON.stringify({ productId })
    })));

    return turnovers.map(turnover => TurnoverDto.fromEntity(turnover));
  }
}
