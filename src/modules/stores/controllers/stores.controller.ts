import { Controller, Delete, Get, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
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
import { TransactionInterceptor } from '../../../core/interceptors/transaction.interceptor';
import { Transaction } from 'sequelize';
import { TransactionParam } from '../../../core/decorators/transaction-param.decorator';

@Controller('stores')
export class StoresController {

  constructor(
    private readonly turnoversService: TurnoversService,
    private readonly productsService: ProductsService
  ) {
  }

  @Post('product')
  @UseGuards(SectionSingleGuard, ProductMultipleGuard, TurnoverAddGuard)
  @UseInterceptors(TransactionInterceptor)
  async postAddProduct(
    @Req() req,
    @TransactionParam() transaction: Transaction
  ) {
    const section = HttpUtil.getRequestData<SectionEntity>(req, 'section');
    const productIds = HttpUtil.getRequestData<IProductId[]>(req, 'productIds');
    const result = await this.turnoversService.bulkInsertProducts({
      transaction,
      productIds,
      sectionId: section.id,
      action: TurnoverAction.add
    });

    return result;
  }

  @Delete('product')
  @UseGuards(SectionSingleGuard, ProductMultipleGuard, TurnoverRemoveGuard)
  @UseInterceptors(TransactionInterceptor)
  async deleteRemoveProduct(
    @Req() req,
    @TransactionParam() transaction: Transaction
  ) {
    const section = HttpUtil.getRequestData<SectionEntity>(req, 'section');
    const productIds = HttpUtil.getRequestData<IProductId[]>(req, 'productIds');
    const result = await this.turnoversService.bulkInsertProducts({
      transaction,
      productIds,
      sectionId: section.id,
      action: TurnoverAction.remove
    });

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
