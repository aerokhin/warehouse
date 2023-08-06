import { Module } from '@nestjs/common';
import { SectionsService } from './services/sections.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { RackEntity } from '../../core/entities/rack.entity';
import { SectionEntity } from '../../core/entities/section.entity';
import { CacheService } from '../../core/services/cache.service';

@Module({
  imports: [
    SequelizeModule.forFeature([ RackEntity, SectionEntity ])
  ],
  providers: [ CacheService, SectionsService ],
  exports: [ SectionsService ]
})
export class SectionsModule {
}
