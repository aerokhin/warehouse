import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LogsService } from '../../modules/logs/services/logs.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    private readonly logsService: LogsService
  ) {
  }

  use(req: Request, res: Response, next: NextFunction) {
    const ms = new Date().getTime();
    const [ url, queryParams ] = req.originalUrl.split('?');
    const method = req.method;
    const reqBody = JSON.stringify(req.body || {});

    const originalSend = res.send;
    const createLog = this.logsService.createLog.bind(this.logsService);

    res.send = function (body: any): any {
      const duration = new Date().getTime() - ms;
      createLog({
        method,
        url,
        queryParams,
        reqBody,
        duration,
        statusCode: res.statusCode,
        resBody: JSON.stringify(body || {})
      });

      originalSend.call(this, body);
    };

    next();
  }
}
