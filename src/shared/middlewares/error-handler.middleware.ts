import { NextFunction, Request, Response } from 'express';
import environment, { Environment } from '../environment';
import { AppError } from '../server/http/app-error.util';
import { HttpCode } from '../server/http/http-code.util';
import { logger } from '../logger';

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction // NOTE: Removing this parameter will NOT catch errors
) => {
  logger.error(err.message, err);

  err.statusCode ||= 500;
  err.status ||= 'error';

  const productionErrorResponse = {
    status: err.status,
    statusCode: err.statusCode,
    message: err.message,
    details: err.details
  };

  const productionEnvironment = environment.nodeEnv === Environment.Production;

  const isTrustedError = err.isOperational;

  if (productionEnvironment) {
    if (isTrustedError) {
      return res.status(err.statusCode).json(productionErrorResponse);
    }

    return res.status(HttpCode.InternalServerError).json({
      status: 'error',
      statusCode: HttpCode.InternalServerError,
      message: 'Something went wrong!'
    });
  }

  const nonProductionErrorResponse = {
    ...productionErrorResponse,
    stack: err.stack
  };

  res.status(err.statusCode).json(nonProductionErrorResponse);
};

export default errorHandler;
