import { Test } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration.util';
import { SequelizeModule } from '@nestjs/sequelize';
import { RackEntity } from '../entities/rack.entity';
import { SectionEntity } from '../entities/section.entity';
import { ProductEntity } from '../entities/product.entity';
import { TurnoverEntity } from '../entities/turnover.entity';
import { LogEntity } from '../entities/log.entity';
import { CacheService } from '../services/cache.service';
import { SectionsService } from '../../modules/sections/services/sections.service';
import { ProductsService } from '../../modules/products/services/products.service';
import { TurnoversService } from '../../modules/turnovers/services/turnovers.service';
import { SectionSingleGuard } from '../guards/section-single.guard';
import { ProductMultipleGuard } from '../guards/product-multiple.guard';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ModuleMetadata } from '@nestjs/common';
import { RacksService } from '../../modules/racks/services/racks.service';
import { StoreEntity } from '../entities/store.entity';
import { StoresService } from '../../modules/stores/services/stores.service';
import { REQUEST } from '@nestjs/core';

export class TestingUtil {
  static async createModule(options: any) {
    const metadata: ModuleMetadata = {
      imports: [
        ConfigModule.forRoot({
          load: [ configuration() ],
          cache: true,
          isGlobal: true
        }),
        SequelizeModule.forRootAsync({
          imports: [ ConfigModule ],
          useFactory: (configService: ConfigService) => {
            return{
              dialect: 'mysql',
              host: configService.get<string>('db.host'),
              port: +configService.get<string>('db.port'),
              username: configService.get<string>('db.username'),
              password: configService.get<string>('db.password'),
              database: configService.get<string>('db.database'),
              logging: false,
              synchronize: true,
              models: [ StoreEntity, RackEntity, SectionEntity, ProductEntity, TurnoverEntity, LogEntity ]
            }},
          inject: [ ConfigService ]
        }),
        SequelizeModule.forFeature([ StoreEntity, RackEntity, SectionEntity, ProductEntity, TurnoverEntity ]),
      ],
      providers: [
        ConfigService,
        CacheService,
        StoresService,
        RacksService,
        SectionsService,
        ProductsService,
        TurnoversService,
        SectionSingleGuard,
        ProductMultipleGuard,
        { provide: CACHE_MANAGER, useValue: {} }
      ]
    };

    return Test.createTestingModule({
      ...metadata,
      ...options
    }).compile();
  }
}
