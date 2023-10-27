import { NextFunction, Request, Response } from 'express';
import { omit } from 'lodash';
import { AppError } from '../../shared/server/http/app-error.util';
import { HttpCode } from '../../shared/server/http/http-code.util';
import { CreateUserInputBody, CreateUserResponse } from './user.schema';
import { createUser, getUser } from './user.service';

export async function createUserHandler(
  // NOTE: <Record<string, never> is used to avoid passing in {} as the type
  req: Request<Record<string, never>, CreateUserResponse, CreateUserInputBody>,
  res: Response<CreateUserResponse>,
  next: NextFunction
) {
  const existingUser = await getUser({ email: req.body.email });

  if (existingUser) {
    return next(new AppError('User already exists', HttpCode.BadRequest));
  }

  const user = await createUser(req.body).save();
  const userWithoutPassword = omit(user.toJSON(), 'password');

  return res.status(HttpCode.Created).json({
    data: userWithoutPassword
  });
}

export async function getCurrentUserHandler(req: Request, res: Response) {
  return res.json({ data: res.locals.user });
}
