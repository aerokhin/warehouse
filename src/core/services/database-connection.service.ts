import { SequelizeModuleOptions, SequelizeOptionsFactory } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StoreEntity } from '../entities/store.entity';
import { RackEntity } from '../entities/rack.entity';
import { SectionEntity } from '../entities/section.entity';
import { ProductEntity } from '../entities/product.entity';
import { TurnoverEntity } from '../entities/turnover.entity';
import { LogEntity } from '../entities/log.entity';

@Injectable()
export class DatabaseConnectionService implements SequelizeOptionsFactory {

  constructor(
    private readonly configService: ConfigService
  ) {
  }

  createSequelizeOptions(): Promise<SequelizeModuleOptions> | SequelizeModuleOptions {
    const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

    return {
      dialect: 'mysql',
      host: this.configService.get<string>('db.host'),
      port: +this.configService.get<string>('db.port'),
      username: this.configService.get<string>('db.username'),
      password: this.configService.get<string>('db.password'),
      database: this.configService.get<string>('db.database'),
      logging: isDev ? console.log : false,
      synchronize: isDev,
      models: [ StoreEntity, RackEntity, SectionEntity, ProductEntity, TurnoverEntity, LogEntity ]
    };
  }

}
