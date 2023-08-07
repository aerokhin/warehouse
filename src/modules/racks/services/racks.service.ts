import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RackEntity } from '../../../core/entities/rack.entity';
import { ICreationService } from '../../../core/types';
import { CreationAttributes } from 'sequelize';

@Injectable()
export class RacksService implements ICreationService<RackEntity> {
  constructor(
    @InjectModel(RackEntity) private rackEntity: typeof RackEntity,
  ) {
  }

  create(attrs: CreationAttributes<any>) {
    return this.rackEntity.create(attrs);
  }
}
