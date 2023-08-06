import { Controller, Delete, Get, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { TurnoversService } from '../../turnovers/services/turnovers.service';
import { ProductsService } from '../services/products.service';
import { SectionSingleGuard } from '../../../core/guards/section-single.guard';
import { ProductMultipleGuard } from '../../../core/guards/product-multiple.guard';
import { TurnoverAddGuard } from '../../../core/guards/turnover-add.guard';
import { TransactionInterceptor } from '../../../core/interceptors/transaction.interceptor';
import { TransactionParam } from '../../../core/decorators/transaction-param.decorator';
import { Transaction } from 'sequelize';
import { HttpUtil } from '../../../core/utils/http.util';
import { SectionEntity } from '../../../core/entities/section.entity';
import { IProductId } from '../types';
import { TurnoverAction } from '../../../core/types';
import { TurnoverRemoveGuard } from '../../../core/guards/turnover-remove.guard';
import { ProductQuantityGuard } from '../../../core/guards/product-quantity.guard';
import { Request } from 'express';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly turnoversService: TurnoversService,
    private readonly productsService: ProductsService
  ) {
  }

  @Post()
  @UseGuards(SectionSingleGuard, ProductMultipleGuard, TurnoverAddGuard)
  @UseInterceptors(TransactionInterceptor)
  async postAddProduct(
    @Req() req: Request,
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

  @Delete()
  @UseGuards(SectionSingleGuard, ProductMultipleGuard, TurnoverRemoveGuard)
  @UseInterceptors(TransactionInterceptor)
  async deleteRemoveProduct(
    @Req() req: Request,
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

  @Get('location')
  @UseGuards(ProductQuantityGuard)
  async getProductLocation(@Req() req: Request) {
    const productId = HttpUtil.getRequestData<IProductId>(req, 'productId');
    const quantity = HttpUtil.getRequestData<number>(req, 'quantity');
    const locations = await this.productsService.findLocations(productId, quantity);

    return locations;
  }
}
