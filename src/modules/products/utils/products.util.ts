import { IProductId, ValidateMethods } from '../types';
import { Size } from '../../../core/types';

const validateMethods: ValidateMethods = {
  'L': (s, result) => {
    const id = s.substring(1);

    if (id && !isNaN(+id)) {
      result.id = +id;
    }
  },
  'S': (s, result) => {
    const size = s.substring(1);

    if (size in Size) {
      result.size = size as Size;
    }
  }
}

export class ProductsUtil {
  static validateId(rawId: string): IProductId {
    if (!rawId) {
      return null;
    }

    const segments = rawId.split(' ');

    if (segments.length !== 2) {
      return null;
    }

    const result: IProductId = {} as IProductId;

    for (const segment of segments) {
      if (segment.length < 2) {
        return null;
      }

      validateMethods[segment.substring(0, 1)](segment, result);
    }

    if (!result.id || !result.size) {
      return null;
    }

    return result;
  }
}
