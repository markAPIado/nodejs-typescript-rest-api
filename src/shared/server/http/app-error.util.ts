import { HttpCode } from './http-code.util';

type StatusCodeType = HttpCode;

export class AppError extends Error {
  isOperational: boolean;
  status: 'fail' | 'error';
  details?: object;

  constructor(
    message: string,
    public statusCode: StatusCodeType,
    details?: object
  ) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = `${statusCode}`.startsWith('5') ? false : true;
    this.details = details;
  }
}
