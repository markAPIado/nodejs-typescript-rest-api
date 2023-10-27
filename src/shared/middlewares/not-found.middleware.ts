import { NextFunction, Request, Response } from 'express';
import { AppError } from '../server/http/app-error.util';
import { HttpCode } from '../server/http/http-code.util';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  next(
    new AppError(
      `Can't find ${req.originalUrl} on this server!`,
      HttpCode.NotFound
    )
  );
};

export default notFound;
