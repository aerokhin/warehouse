import { Column, CreatedAt, Table, UpdatedAt, Model } from 'sequelize-typescript';
import { IProductMeta, Size, TurnoverAction } from '../types';

@Table({ modelName: 'turnovers' })
export class TurnoverEntity extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ field: 'section_id' })
  sectionId: number;

  @Column({ field: 'product_id' })
  productId: number;

  @Column
  action: TurnoverAction;

  @Column
  quantity: number;

  @Column
  size: Size;

  @Column({ type: 'json' })
  meta: IProductMeta;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
