import { HandlerException } from 'src/common/constants/exceptions/HandlerException';
import { HttpException } from '@nestjs/common';
// import * as Sentry from '@sentry/nestjs';
import { Request } from 'express';

// import { writeLog } from './log.utils';

import { SERVER_EXIT_CODE } from 'src/common/enums/error-code.enum';

export const catchErrService = (path: string, err: any) => {
  console.log(err);

  // Sentry.captureException(err);
  // writeLog(path, err?.message);
};

export const catchErrController = (err: any, req: Request) => {
  if (err instanceof HttpException) throw err;
  else {
    // Sentry.captureException(err);

    throw new HandlerException(
      SERVER_EXIT_CODE.INTERNAL_SERVER_ERROR,
      req.method,
      req.url,
    );
  }
};

export const catchErrFunction = (err: any, req: Request) => {
  console.log('----------------------------------------------------------');
  console.log(req.method + ' - ' + req.url + ': ' + err.message);

  if (err instanceof HttpException) {
    return err;
  }

  // Sentry.captureException(err);

  return new HandlerException(
    SERVER_EXIT_CODE.INTERNAL_SERVER_ERROR,
    req.method,
    req.url,
  );
};
