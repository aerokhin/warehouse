import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { AppController } from './core/controllers/app.controller';
import { AppService } from './core/services/app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './core/utils/configuration.util';
import { DatabaseConnectionService } from './core/services/database-connection.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { StoresModule } from './modules/stores/stores.module';
import { SectionsModule } from './modules/sections/sections.module';
import { CacheService } from './core/services/cache.service';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true
    }),
    ConfigModule.forRoot({
      load: [ configuration(__dirname.toLowerCase() + '/../') ],
      cache: true,
      isGlobal: true
    }),
    SequelizeModule.forRootAsync({
      imports: [ ConfigModule ],
      useClass: DatabaseConnectionService
    }),
    StoresModule,
    SectionsModule,
    ProductsModule
  ],
  controllers: [ AppController ],
  providers: [ AppService, DatabaseConnectionService, CacheService ],
})
export class AppModule {
}
