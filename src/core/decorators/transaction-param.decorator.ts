import { createParamDecorator } from '@nestjs/common';
import { HttpUtil } from '../utils/http.util';
import { Transaction } from 'sequelize';

export const TransactionParam: () => ParameterDecorator = () => {
  return createParamDecorator((_data, req) => {
    return HttpUtil.getRequestData<Transaction>(req, 'transaction');
  });
};
