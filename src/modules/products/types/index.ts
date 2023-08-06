import { Size } from '../../../core/types';

export interface IProductId {
  id: number;
  size: Size;
}

export type ValidateMethods = {
  [key: string]: (s: string, result: IProductId) => void;
}
