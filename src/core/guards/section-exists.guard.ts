import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { HttpUtil } from '../utils/http.util';
import { SectionsService } from '../../modules/sections/services/sections.service';
import { SectionsUtil } from '../../modules/sections/utils/sections.util';

@Injectable()
export class SectionExistsGuard implements CanActivate {
  constructor(
    private readonly sectionsService: SectionsService
  ) {
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const { req, res } = HttpUtil.getHttpObjects(context);
    const sectionId = SectionsUtil.validateId(req.body['section']);

    if (!sectionId) {
      res.status(400).json({ message: `Section ID has wrong format` });
      return false;
    }

    const { rackAlias, sectionNo } = sectionId;
    const section = await this.sectionsService.findByRackAliasAndSectionNo(rackAlias, +sectionNo);

    if (!section) {
      res.status(400).json({ message: `Section ${sectionId} doesn't exist` });
      return false;
    }

    HttpUtil.setRequestData(req, 'section', section);

    return true;
  }
}
