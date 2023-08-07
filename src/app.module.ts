import { CacheModule } from '@nestjs/cache-manager';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppService } from './core/services/app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './core/utils/configuration.util';
import { DatabaseConnectionService } from './core/services/database-connection.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { StoresModule } from './modules/stores/stores.module';
import { SectionsModule } from './modules/sections/sections.module';
import { CacheService } from './core/services/cache.service';
import { ProductsModule } from './modules/products/products.module';
import { TurnoversModule } from './modules/turnovers/turnovers.module';
import { LoggerMiddleware } from './core/middlewares/logger.middleware';
import { LogsModule } from './modules/logs/logs.module';
import { RacksModule } from './modules/racks/racks.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true
    }),
    ConfigModule.forRoot({
      load: [ configuration() ],
      cache: true,
      isGlobal: true
    }),
    SequelizeModule.forRootAsync({
      imports: [ ConfigModule ],
      useClass: DatabaseConnectionService
    }),
    StoresModule,
    SectionsModule,
    ProductsModule,
    TurnoversModule,
    LogsModule,
    RacksModule
  ],
  providers: [
    AppService,
    DatabaseConnectionService,
    CacheService
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // Apply the middleware to all routes
  }
}
