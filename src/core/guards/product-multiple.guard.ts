import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { HttpUtil } from '../utils/http.util';
import { ProductsUtil } from '../../modules/products/utils/products.util';
import { ProductsService } from '../../modules/products/services/products.service';
import { IProductId } from '../../modules/products/types';

@Injectable()
export class ProductMultipleGuard implements CanActivate {
  constructor(
    private readonly productsService: ProductsService
  ) {
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const { req } = HttpUtil.getHttpObjects(context);
    const rawIds: string[] = req.body?.['products'] || [];

    if (rawIds.length === 0) {
      throw new BadRequestException({
        message: 'Products are not specified'
      });
    }

    const { badIds, productIds } = ProductsUtil.validateIds(rawIds);

    if (badIds.length > 0) {
      throw new BadRequestException({
        message: 'Some product IDs are not formed correctly',
        ids: badIds
      });
    }

    const products = await this.productsService.findByIds(productIds.map(productId => productId.id));
    const { badProductIds, badSizeIds } = ProductsUtil.validateProducts(products, productIds);

    if (badProductIds.length) {
      throw new BadRequestException({
        message: 'Some products do not exist in the system',
        ids: badProductIds
      });
    }

    if (badSizeIds.length) {
      throw new BadRequestException({
        message: 'Some products do have wrong size',
        ids: badSizeIds
      });
    }

    HttpUtil.setRequestData<IProductId[]>(req, 'productIds', productIds);

    return true;
  }
}
