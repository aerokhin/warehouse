import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { HttpUtil } from '../utils/http.util';
import { Transaction } from 'sequelize';

@Injectable()
export class TransactionInterceptor implements NestInterceptor {

  constructor(
    @InjectConnection()
    private readonly sequelizeInstance: Sequelize
  ) {
  }

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const { req } = HttpUtil.getHttpObjects(context);

    const transaction: Transaction = await this.sequelizeInstance.transaction();
    HttpUtil.setRequestData<Transaction>(req, 'transaction', transaction);

    return next.handle().pipe(
      tap(() => {
        transaction.commit();
      }),
      catchError(e => {
        transaction.rollback();
        return throwError(() => e);
      })
    );
  }
}
