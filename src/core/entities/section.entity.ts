import { Column, CreatedAt, Table, UpdatedAt, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { RackEntity } from './rack.entity';

@Table({ modelName: 'sections' })
export class SectionEntity extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => RackEntity)
  @Column({ field: 'rack_id' })
  rackId: number;

  @BelongsTo(() => RackEntity)
  rack: RackEntity;

  @Column({ field: 'section_no' })
  sectionNo: number;

  @Column
  capacity: number;

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
