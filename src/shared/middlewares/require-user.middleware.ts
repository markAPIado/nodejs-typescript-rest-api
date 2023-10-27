import { NextFunction, Request, Response } from 'express';
import { HttpCode } from '../server/http/http-code.util';
import { AppError } from '../server/http/app-error.util';

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  if (!user) {
    return next(new AppError('Forbidden', HttpCode.Forbidden));
  }

  next();
};

export default requireUser;
