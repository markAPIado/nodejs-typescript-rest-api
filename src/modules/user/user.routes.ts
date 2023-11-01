import { Router } from 'express';
import { createUserHandler, getCurrentUserHandler } from './user.controller';
import validateRequest from '../../shared/middlewares/validate-request.middleware';
import { createUserSchema } from './user.schema';
import requireUser from '../../shared/middlewares/require-user.middleware';
import deserializeUser from '../../shared/middlewares/deserialize-user.middleware';

export enum UserRoutes {
  UserApiPath = '/api/users',
  RootPath = '/',
  MePath = '/me'
}

const userRouter = Router();

userRouter.post(
  UserRoutes.RootPath,
  validateRequest(createUserSchema),
  createUserHandler
);

userRouter.get(
  UserRoutes.MePath,
  [deserializeUser, requireUser],
  getCurrentUserHandler
);

export default userRouter;
