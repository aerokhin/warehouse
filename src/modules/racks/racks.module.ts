import { Module } from '@nestjs/common';
import { RacksService } from './services/racks.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { RackEntity } from '../../core/entities/rack.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([ RackEntity ])
  ],
  providers: [ RacksService ],
  exports: [ RacksService ]
})
export class RacksModule {
}
