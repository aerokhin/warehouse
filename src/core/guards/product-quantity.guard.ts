import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { HttpUtil } from '../utils/http.util';
import { ProductsUtil } from '../../modules/products/utils/products.util';
import { ProductsService } from '../../modules/products/services/products.service';
import { TurnoversService } from '../../modules/turnovers/services/turnovers.service';
import { TurnoverAction } from '../types';
import { IProductId } from '../../modules/products/types';

@Injectable()
export class ProductQuantityGuard implements CanActivate {

  constructor(
    private readonly productsService: ProductsService,
    private readonly turnoversService: TurnoversService
  ) {
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const { req } = HttpUtil.getHttpObjects(context);
    const quantity = req.query['qty'];
    const rawId = req.query['id'].toString();
    const productId = ProductsUtil.validateId(rawId);

    if (!productId) {
      throw new BadRequestException({
        message: `${productId} has wrong format`
      });
    }

    if (!quantity || isNaN(+quantity) || +quantity <= 0) {
      throw new BadRequestException({
        message: 'Quantity is not specified or is not positive number'
      });
    }

    const product = await this.productsService.findByPk(productId.id);

    if (!product) {
      throw new BadRequestException({
        message: `Product ${productId.raw} does not exist`
      });
    }

    const additions = await this.turnoversService.quantityByProductActionSize(productId.id, TurnoverAction.add, productId.size);
    const removals = await this.turnoversService.quantityByProductActionSize(productId.id, TurnoverAction.remove, productId.size);

    if (additions - removals < +quantity) {
      throw new BadRequestException({
        message: `The specified quantity of the product ${productId.raw} is not available in the store`
      });
    }

    HttpUtil.setRequestData<IProductId>(req, 'productId', productId);
    HttpUtil.setRequestData<number>(req, 'quantity', +quantity);

    return true;
  }
}
