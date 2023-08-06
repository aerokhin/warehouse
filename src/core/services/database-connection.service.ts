import { SequelizeModuleOptions, SequelizeOptionsFactory } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StoreEntity } from '../entities/store.entity';
import { RackEntity } from '../entities/rack.entity';
import { SectionEntity } from '../entities/section.entity';
import { ProductEntity } from '../entities/product.entity';

@Injectable()
export class DatabaseConnectionService implements SequelizeOptionsFactory {

  constructor(
    private readonly configService: ConfigService
  ) {
  }

  createSequelizeOptions(): Promise<SequelizeModuleOptions> | SequelizeModuleOptions {
    return {
      dialect: 'mysql',
      host: this.configService.get<string>('db.host'),
      port: +this.configService.get<string>('db.port'),
      username: this.configService.get<string>('db.username'),
      password: this.configService.get<string>('db.password'),
      database: this.configService.get<string>('db.database'),
      logging: process.env.NODE_ENV === 'production' ? false : console.log,
      synchronize: true,
      models: [ StoreEntity, RackEntity, SectionEntity, ProductEntity ]
    };
  }

}
