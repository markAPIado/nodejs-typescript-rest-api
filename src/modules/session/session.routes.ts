import { Router } from 'express';
import {
  createUserSessionHandler,
  deleteUserSessionHandler,
  getUserSessionsHandler
} from './session.controller';
import validateRequest from '../../shared/middlewares/validate-request.middleware';
import { createSessionSchema } from './session.schema';
import requireUser from '../../shared/middlewares/require-user.middleware';
import deserializeUser from '../../shared/middlewares/deserialize-user.middleware';
import { createRateLimit } from '../../shared/security/rate-limit.utils';
import environment, { Environment } from '../../shared/environment';

export enum SessionRoutes {
  SessionApiPath = '/api/sessions',
  RootPath = '/'
}

const sessionRouter = Router();

sessionRouter
  .route(SessionRoutes.RootPath)
  .post(
    [
      createRateLimit({
        max: environment.nodeEnv === Environment.Test ? 1000 : 3,
        minutes: 2,
        message: 'Too many requests. Please try again after 2 minutes.'
      }),
      validateRequest(createSessionSchema)
    ],
    createUserSessionHandler
  )
  .get([deserializeUser, requireUser], getUserSessionsHandler)
  .delete([deserializeUser, requireUser], deleteUserSessionHandler);

export default sessionRouter;
