import { IProductId } from '../../products/types';
import { ITransactionParams, TurnoverAction } from '../../../core/types';

export interface IBulkInsertParams extends ITransactionParams {
  sectionId: number;
  productIds: IProductId[];
  action: TurnoverAction;
}
