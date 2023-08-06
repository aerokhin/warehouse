import { Module } from '@nestjs/common';
import { TurnoversService } from './services/turnovers.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TurnoverEntity } from '../../core/entities/turnover.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([ TurnoverEntity ]),
  ],
  providers: [ TurnoversService ],
  exports: [ TurnoversService ]
})
export class TurnoversModule {
}
