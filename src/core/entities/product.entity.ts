import { Column, CreatedAt, Table, UpdatedAt, Model } from 'sequelize-typescript';
import { IProductMeta } from '../types';

@Table({ modelName: 'products' })
export class ProductEntity extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  name: string;

  @Column({ type: 'json' })
  meta: IProductMeta;

  @Column
  enabled: boolean;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
