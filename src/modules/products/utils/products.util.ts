import { IProductId, IValidateIdsResult, IValidateProductsResult, ValidateMethods } from '../types';
import { Size } from '../../../core/types';
import { CommonUtil } from '../../../core/utils/common.util';
import { ProductEntity } from '../../../core/entities/product.entity';

const validateMethods: ValidateMethods = {
  'L': (s, result) => {
    const id = s.substring(1);

    if (id && !isNaN(+id)) {
      result.id = +id;
    }
  },
  'S': (s, result) => {
    const size = s.substring(1);

    if ((Object.values(Size) as string[]).includes(size)) {
      result.size = size as Size;
    }
  }
}

export class ProductsUtil {
  static validateId(rawId: string): IProductId {
    if (!rawId) {
      return null;
    }

    const segments = CommonUtil.removeMultipleSpaces(rawId).split(' ');

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

    result.raw = rawId;

    return result;
  }

  static validateIds(rawIds: string[]): IValidateIdsResult {
    const badIds: string[] = [];
    const productIds: IProductId[] = [];

    for (const rawId of rawIds) {
      const productId = ProductsUtil.validateId(rawId);

      if (productId) {
        productIds.push(productId);
      } else {
        badIds.push(rawId)
      }
    }

    return {
      badIds,
      productIds
    };
  }

  static validateProducts(products: ProductEntity[], productIds: IProductId[]): IValidateProductsResult {
    if (productIds.length !== products.length) {
      const ids = products.map(product => product.id);

      return {
        badProductIds: productIds.filter(productId => !ids.includes(productId.id)).map(productId => productId.raw),
        badSizeIds: []
      };
    }

    const badSizeIds = productIds
      .filter(productId =>
        !products.find(product => product.id === productId.id).meta.sizes.includes(productId.size)
      )
      .map(productId => productId.raw);

    if (badSizeIds.length > 0) {
      return {
        badSizeIds,
        badProductIds: []
      }
    }

    return {
      badProductIds: [],
      badSizeIds: []
    }
  }
}
