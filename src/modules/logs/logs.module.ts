import { Module } from '@nestjs/common';
import { LogsService } from './services/logs.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { LogEntity } from '../../core/entities/log.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([ LogEntity ]),
  ],
  providers: [ LogsService ],
  exports: [ LogsService ]
})
export class LogsModule {
}
