import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LogEntity } from '../../../core/entities/log.entity';
import { ICreateLogParams } from '../types';

@Injectable()
export class LogsService {
  constructor(
    @InjectModel(LogEntity) private logEntity: typeof LogEntity,
  ) {
  }

  async createLog(params: ICreateLogParams) {
    try {
      return this.logEntity.create({
        ...params,
        isError: params.statusCode >= 400
      });
    } catch (e) {
      console.log('>>>>> logsService.createLog:', e);
    }
  }
}
