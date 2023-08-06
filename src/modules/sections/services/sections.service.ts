import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SectionEntity } from '../../../core/entities/section.entity';
import { CacheService } from '../../../core/services/cache.service';
import { RackEntity } from '../../../core/entities/rack.entity';

@Injectable()
export class SectionsService {
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
              where: {
                alias: rackAlias
              },
              required: true
            }
          ],
          where: {
            sectionNo,
            enabled: true
          }
        });
      }
    );
  }
}
