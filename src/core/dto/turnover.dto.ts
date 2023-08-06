import { Size, TurnoverAction } from '../types';
import { TurnoverEntity } from '../entities/turnover.entity';
import { DtoUtil } from '../utils/dto.util';

export class TurnoverDto {
  sectionId: number = null;
  productId: number = null;
  action: TurnoverAction = null;
  quantity: number = null;
  size: Size = null;

  static fromEntity(entity: TurnoverEntity): TurnoverDto {
    return DtoUtil.toDto<TurnoverDto>(entity, new TurnoverDto());
  }
}
