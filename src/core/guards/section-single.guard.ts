import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { HttpUtil } from '../utils/http.util';
import { SectionsService } from '../../modules/sections/services/sections.service';
import { SectionsUtil } from '../../modules/sections/utils/sections.util';

@Injectable()
export class SectionSingleGuard implements CanActivate {
  constructor(
    private readonly sectionsService: SectionsService
  ) {
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const { req } = HttpUtil.getHttpObjects(context);
    const sectionId = SectionsUtil.validateId(req.body['section']);

    if (!sectionId) {
      throw new BadRequestException({ message: `Section ID has wrong format` });
    }

    const { rackAlias, sectionNo } = sectionId;
    const section = await this.sectionsService.findByRackAliasAndSectionNo(rackAlias, +sectionNo);

    if (!section) {
      throw new BadRequestException({ message: `Section ${sectionId} doesn't exist` });
    }

    HttpUtil.setRequestData(req, 'section', section);

    return true;
  }
}
