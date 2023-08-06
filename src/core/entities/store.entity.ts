import { Column, CreatedAt, Table, UpdatedAt, Model } from 'sequelize-typescript';

@Table({ modelName: 'stores' })
export class StoreEntity extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  name: string;

  @Column({ type: 'json' })
  meta: any;

  @Column
  enabled: boolean;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
