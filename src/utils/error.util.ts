import { HttpException } from "@nestjs/common";
import { HandlerException } from "src/common/constants/exceptions/HandlerException";
import { SERVER_EXIT_CODE } from "src/common/enums/error-code.enum";


export const catchErrService = (path: string, err: any) => {
  console.log(err);
};

export const catchErrController = (err: any, req: Request) => {
  console.log('enter catchErrController');
  if (err instanceof HttpException) {
    console.log('err instanceof HttpException');
    throw err;
  }
  else {
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

  return new HandlerException(
    SERVER_EXIT_CODE.INTERNAL_SERVER_ERROR,
    req.method,
    req.url,
  );
};
