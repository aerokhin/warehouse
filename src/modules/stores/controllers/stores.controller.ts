import { Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common';
import { SectionSingleGuard } from '../../../core/guards/section-single.guard';
import { ProductMultipleGuard } from '../../../core/guards/product-multiple.guard';
import { TurnoverAddGuard } from '../../../core/guards/turnover-add.guard';
import { TurnoversService } from '../../turnovers/services/turnovers.service';
import { HttpUtil } from '../../../core/utils/http.util';
import { SectionEntity } from '../../../core/entities/section.entity';
import { IProductId } from '../../products/types';
import { TurnoverRemoveGuard } from '../../../core/guards/turnover-remove.guard';
import { TurnoverAction } from '../../../core/types';
import { ProductQuantityGuard } from '../../../core/guards/product-quantity.guard';
import { ProductsService } from '../../products/services/products.service';

@Controller('stores')
export class StoresController {

  constructor(
    private readonly turnoversService: TurnoversService,
    private readonly productsService: ProductsService
  ) {
  }

  @Post('product')
  @UseGuards(SectionSingleGuard, ProductMultipleGuard, TurnoverAddGuard)
  async postAddProduct(@Req() req) {
    const section = HttpUtil.getRequestData<SectionEntity>(req, 'section');
    const productIds = HttpUtil.getRequestData<IProductId[]>(req, 'productIds');
    const result = await this.turnoversService.bulkInsertProducts(section.id, productIds, TurnoverAction.add);

    return result;
  }

  @Delete('product')
  @UseGuards(SectionSingleGuard, ProductMultipleGuard, TurnoverRemoveGuard)
  async deleteRemoveProduct(@Req() req) {
    const section = HttpUtil.getRequestData<SectionEntity>(req, 'section');
    const productIds = HttpUtil.getRequestData<IProductId[]>(req, 'productIds');
    const result = await this.turnoversService.bulkInsertProducts(section.id, productIds, TurnoverAction.remove);

    return result;
  }

  @Get('product/location')
  @UseGuards(ProductQuantityGuard)
  async getProductLocation(@Req() req) {
    const productId = HttpUtil.getRequestData<IProductId>(req, 'productId');
    const quantity = HttpUtil.getRequestData<number>(req, 'quantity');
    const test = await this.productsService.findLocation(productId, quantity);

    return test;
  }
}
