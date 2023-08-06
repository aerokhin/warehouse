import { Column, CreatedAt, Table, UpdatedAt, Model, HasMany } from 'sequelize-typescript';
import { SectionEntity } from './section.entity';

@Table({ modelName: 'racks' })
export class RackEntity extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ field: 'store_id' })
  storeId: number;

  @Column
  alias: string;

  @Column
  name: string;

  @Column({ type: 'json' })
  meta: any;

  @Column
  enabled: boolean;

  @HasMany(() => SectionEntity)
  sections: SectionEntity[];

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
