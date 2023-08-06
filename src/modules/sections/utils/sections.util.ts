import { ISectionId } from '../types';

export class SectionsUtil {
  static validateId(rawId = ''): ISectionId {
    if (!rawId) {
      return null;
    }

    const [ rackAlias, sectionNo ] = rawId.split('-');

    if (!rackAlias || !sectionNo || isNaN(+sectionNo)) {
      return null;
    }

    return {
      rackAlias,
      sectionNo: +sectionNo
    }
  }
}
