import { Router } from 'express';
import { createUserHandler, getCurrentUserHandler } from './user.controller';
import validateRequest from '../../shared/middlewares/validate-request.middleware';
import { createUserSchema } from './user.schema';
import requireUser from '../../shared/middlewares/require-user.middleware';
import deserializeUser from '../../shared/middlewares/deserialize-user.middleware';

export enum USER_ROUTES {
  BASE = '/api/users',
  ROOT = '/',
  ME = '/me'
}

const userRouter = Router();

userRouter.post(
  USER_ROUTES.ROOT,
  validateRequest(createUserSchema),
  createUserHandler
);

userRouter.get(
  USER_ROUTES.ME,
  [deserializeUser, requireUser],
  getCurrentUserHandler
);

export default userRouter;
