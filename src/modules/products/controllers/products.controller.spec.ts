import { TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { TestingUtil } from '../../../core/utils/testing.util';
import { RacksService } from '../../racks/services/racks.service';
import { StoresService } from '../../stores/services/stores.service';
import { SectionsService } from '../../sections/services/sections.service';
import { Sequelize } from 'sequelize-typescript';
import { StoreEntity } from '../../../core/entities/store.entity';
import { ProductsService } from '../services/products.service';
import { SectionSingleGuard } from '../../../core/guards/section-single.guard';
import { ProductMultipleGuard } from '../../../core/guards/product-multiple.guard';
import { TurnoverAddGuard } from '../../../core/guards/turnover-add.guard';
import { ExecutionContext } from '@nestjs/common';
import { TurnoverAction } from '../../../core/types';
import { TurnoverRemoveGuard } from '../../../core/guards/turnover-remove.guard';

describe('ProductsController', () => {
  let sequelize: Sequelize;
  let storeService: StoresService;
  let racksService: RacksService;
  let sectionsService: SectionsService;
  let productsService: ProductsService;
  let controller: ProductsController;
  let defaultStore: StoreEntity;
  let sectionSingleGuard: SectionSingleGuard;
  let productMultipleGuard: ProductMultipleGuard;
  let turnoverAddGuard: TurnoverAddGuard;
  let turnoverRemoveGuard: TurnoverRemoveGuard;
  let req: any = {};
  let context: ExecutionContext;

  beforeAll(async () => {
    const module: TestingModule = await TestingUtil.createModule({
      controllers: [ ProductsController ]
    });

    controller = module.get<ProductsController>(ProductsController);
    sequelize = module.get<Sequelize>(Sequelize);
    storeService = module.get<StoresService>(StoresService);
    racksService = module.get<RacksService>(RacksService);
    sectionsService = module.get<SectionsService>(SectionsService);
    productsService = module.get<ProductsService>(ProductsService);
    sectionSingleGuard = module.get<SectionSingleGuard>(SectionSingleGuard);
    productMultipleGuard = module.get<ProductMultipleGuard>(ProductMultipleGuard);
    turnoverAddGuard = module.get<TurnoverAddGuard>(TurnoverAddGuard);
    turnoverRemoveGuard = module.get<TurnoverRemoveGuard>(TurnoverRemoveGuard);
  });

  afterAll(async () => {
    await sequelize.close();
  });

  beforeEach(async () => {
    await sequelize.sync({ force: true });
    await fillDb();

    req = {};
    context = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue(req),
        getResponse: jest.fn().mockReturnValue({})
      }),
    } as unknown as ExecutionContext;
  });

  async function fillDb() {
    defaultStore = await storeService.create({ name: 'Default store' });

    const rack = await racksService.create({
      storeId: defaultStore.id,
      alias: 'AA',
      name: 'Rack 1',
      enabled: true
    });

    await sectionsService.create({
      rackId: rack.id,
      sectionNo: 1,
      capacity: 2,
      name: 'Section 1',
      enabled: true
    });

    await sectionsService.create({
      rackId: rack.id,
      sectionNo: 2,
      capacity: 3,
      name: 'Section 2',
      enabled: true
    });

    const products = [ 1, 2, 3 ];

    for (const i of products) {
      await productsService.create({
        id: 10000 + i,
        name: `Product ${i}`,
        meta: JSON.stringify({ sizes: [ 'S', 'M', 'L' ] }),
        enabled: true
      });
    }
  }

  async function runGuards(action = TurnoverAction.add) {
    let result = true;
    result = result && (await sectionSingleGuard.canActivate(context));
    result = result && (await productMultipleGuard.canActivate(context));
    result = result && action === TurnoverAction.add
      ? (await turnoverAddGuard.canActivate(context))
      : (await turnoverRemoveGuard.canActivate(context));

    return result;
  }

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('SectionSingleGuard, ProductMultipleGuard', () => {
    it('should fail when request body is not specified', () => {
      expect(async () => await runGuards()).rejects.toThrow();
    });

    it('should fail when section has wrong format', () => {
      req.body = {
        section: 'AA1'
      };

      expect(async () => await runGuards()).rejects.toThrow();
    });

    it('should fail when section does not exist', () => {
      req.body = {
        section: 'WW-1'
      };

      expect(async () => await runGuards()).rejects.toThrow();
    });

    it('should fail when products are not specified', () => {
      req.body = {
        section: 'AA-1'
      };

      expect(async () => await runGuards()).rejects.toThrow();
    });

    it('should fail when products have wrong format', () => {
      const products = [ 'X10001 SM', 'L10002SS' ];
      req.body = {
        products,
        section: 'AA-1'
      };

      expect(async () => await runGuards()).rejects.toThrow();
    });

    it('should fail when products have wrong size', () => {
      const products = [ 'L10001 SXL', 'L10002 SM' ];
      req.body = {
        products,
        section: 'AA-1'
      };

      expect(async () => await runGuards()).rejects.toThrow();
    });
  })

  describe('postAddProduct', () => {
    it('should allow to add one product to the section', async () => {
      const products = [ 'L10001 SM' ];
      req.body = {
        products,
        section: 'AA-1'
      };

      await runGuards();
      const result = await controller.postAddProduct(req, undefined);

      expect(result.length).toEqual(products.length);
    });

    it('should allow to add multiple products to the section', async () => {
      const products = [ 'L10001 SM', 'L10002 SS' ];
      req.body = {
        products,
        section: 'AA-1'
      };

      await runGuards();
      const result = await controller.postAddProduct(req, undefined);

      expect(result.length).toEqual(products.length);
    });

    it('should fail when section capacity is less than products count', () => {
      const products = [ 'L10001 SM', 'L10002 SS', 'L10003 SS' ];
      req.body = {
        products,
        section: 'AA-1'
      };

      expect(async () => await runGuards()).rejects.toThrow();
    });
  });

  describe('deleteRemoveProduct', () => {
    beforeEach(async () => {
      const products = [ 'L10001 SM', 'L10002 SS' ];
      req.body = {
        products,
        section: 'AA-1'
      };

      await runGuards();
      await controller.postAddProduct(req, undefined);
    })

    it('should allow to remove one product from the section', async () => {
      const products = [ 'L10001 SM' ];
      req.body = {
        products,
        section: 'AA-1'
      };

      await runGuards(TurnoverAction.remove);
      const result = await controller.deleteRemoveProduct(req, undefined);

      expect(result.length).toEqual(products.length);
    });

    it('should allow to remove multiple products from the section', async () => {
      const products = [ 'L10001 SM', 'L10002 SS' ];
      req.body = {
        products,
        section: 'AA-1'
      };

      await runGuards(TurnoverAction.remove);
      const result = await controller.deleteRemoveProduct(req, undefined);

      expect(result.length).toEqual(products.length);
    });

    it('should fail when current products count is less than products input', () => {
      const products = [ 'L10001 SM', 'L10002 SS', 'L10003 SS' ];
      req.body = {
        products,
        section: 'AA-1'
      };

      expect(async () => await runGuards(TurnoverAction.remove)).rejects.toThrow();
    });
  });
});
