import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { AppError } from '../server/http/app-error.util';
import { HttpCode } from '../server/http/http-code.util';

const validateRequest =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params
      });
      next();
    } catch (error) {
      let err = error;
      if (err instanceof ZodError) {
        err = err.issues.map((e) => ({ path: e.path[1], message: e.message }));
      }

      next(
        new AppError('Validation Error', HttpCode.BadRequest, err as object)
      );
    }
  };

export default validateRequest;
