import { Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { SectionExistsGuard } from '../../../core/guards/section-exists.guard';

@Controller('stores')
export class StoresController {

  @Post('product')
  @UseGuards(SectionExistsGuard)
  async postAddProduct() {
    return true;
  }

  @Delete('product')
  async deleteRemoveProduct() {

  }
}
