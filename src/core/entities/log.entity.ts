import { Column, CreatedAt, Table, UpdatedAt, Model } from 'sequelize-typescript';

@Table({ modelName: 'logs' })
export class LogEntity extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  method: string;

  @Column
  url: string;

  @Column({ field: 'query_params' })
  queryParams: string;

  @Column({ field: 'req_body' })
  reqBody: string;

  @Column
  duration: number;

  @Column({ field: 'status_code' })
  statusCode: number;

  @Column({ field: 'res_body' })
  resBody: string;

  @Column({ field: 'is_error' })
  isError: boolean;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
