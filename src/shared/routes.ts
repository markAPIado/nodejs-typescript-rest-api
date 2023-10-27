import { Express } from 'express';
import sessionRouter, {
  SESSION_ROUTES
} from '../modules/session/session.routes';
import healthCheckRouter from '../modules/test-api/test-api.routes';
import userRouter, { USER_ROUTES } from '../modules/user/user.routes';
import errorHandler from './middlewares/error-handler.middleware';
import notFound from './middlewares/not-found.middleware';

function initRoutes(app: Express) {
  app.use(healthCheckRouter);

  app.use(USER_ROUTES.BASE, userRouter);
  app.use(SESSION_ROUTES.BASE, sessionRouter);

  app.use(notFound);
  app.use(errorHandler);
}

export default initRoutes;
