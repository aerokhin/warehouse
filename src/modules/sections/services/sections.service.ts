import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SectionEntity } from '../../../core/entities/section.entity';
import { CacheService } from '../../../core/services/cache.service';
import { ICreationService } from '../../../core/types';
import { RackEntity } from '../../../core/entities/rack.entity';
import { CreationAttributes } from 'sequelize';

@Injectable()
export class SectionsService implements ICreationService<SectionEntity> {
  constructor(
    @InjectModel(SectionEntity) private sectionEntity: typeof SectionEntity,
    private readonly cacheService: CacheService
  ) {
  }

  async findByRackAliasAndSectionNo(rackAlias: string, sectionNo: number): Promise<SectionEntity> {
    return this.cacheService.assign<SectionEntity>(
      `db/sections/${rackAlias}/${sectionNo}`,
      async () => {
        return this.sectionEntity.findOne({
          include: [
            {
              model: RackEntity,
              required: true,
              where: {
                alias: rackAlias
              }
            }
          ],
          where: {
            sectionNo
          },
        });
      }
    );
  }

  async findByPk(id: number) {
    return this.cacheService.assign<SectionEntity>(
      `db/sections/${id}`,
      async () => {
        return this.sectionEntity.findOne({
          include: [
            {
              model: RackEntity,
              required: true
            }
          ],
          where: {
            id
          },
        });
      }
    );
  }

  create(attrs: CreationAttributes<any>) {
    return this.sectionEntity.create(attrs);
  }
}
