import { ExecutionContext } from '@nestjs/common';
import { IHttpObjects } from '../types';
import { Request } from 'express';

export class HttpUtil {
  static getHttpObjects(context: ExecutionContext): IHttpObjects {
    const http = context.switchToHttp();
    const req = http.getRequest<Request>();
    const res = http.getResponse();

    return { http, req, res }
  }

  static getRequestData<T>(req: Request, key: string, defaultValue = null): T {
    const data: any = req['data'] || {};

    return data[key] as T || defaultValue;
  }

  static setRequestData<T>(req: Request, key: string, value: T) {
    if (!req['data']) {
      req['data'] = {};
    }

    req['data']['key'] = value;
  }
}
