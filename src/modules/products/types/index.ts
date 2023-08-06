import { Size } from '../../../core/types';

export interface IProductId {
  raw: string;
  id: number;
  size: Size;
}

export type ValidateMethods = {
  [key: string]: (s: string, result: IProductId) => void;
}

export interface IValidateIdsResult {
  productIds: IProductId[];
  badIds: string[];
}

export interface IValidateProductsResult {
  badProductIds: string[];
  badSizeIds: string[];
}
