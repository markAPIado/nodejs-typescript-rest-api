import { NextFunction, Request, Response } from 'express';

/**
 * NOTE: This middleware is used to handle async functions. It is used to avoid the try/catch block in the controller and delegates the error handling to the error handler middleware. By default, this project uses the express-async-errors package to handle async errors in express. Check the winston.logger.ts file for more details.
 * Example: app.get('/', asyncMiddleware(controller));
 */
function asyncMiddleware<
  T extends (req: Request, res: Response) => Promise<void>
>(handler: T) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res);
    } catch (error) {
      next(error);
    }
  };
}

export default asyncMiddleware;
