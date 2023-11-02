import { Express } from 'express';
import sessionRouter, {
  SessionRoutes
} from '../modules/session/session.routes';
import healthCheckRouter from '../modules/test-api/test-api.routes';
import userRouter, { UserRoutes } from '../modules/user/user.routes';
import errorHandler from './middlewares/error-handler.middleware';
import notFound from './middlewares/not-found.middleware';

function initRoutes(app: Express) {
  /**
   * NOTE: Add your routes here
   */
  app.use(UserRoutes.UserApiPath, userRouter);
  app.use(SessionRoutes.SessionApiPath, sessionRouter);

  app.use(healthCheckRouter);
  app.use(notFound);
  app.use(errorHandler);
}

export default initRoutes;
