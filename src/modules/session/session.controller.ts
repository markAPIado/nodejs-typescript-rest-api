import { NextFunction, Request, Response } from 'express';
import { omit } from 'lodash';
import environment from '../../shared/environment';
import { cookieOptions } from '../../shared/security/cookie-options';
import { signJwt } from '../../shared/security/jwt/jwt.utils';
import { AppError } from '../../shared/server/http/app-error.util';
import { HttpCode } from '../../shared/server/http/http-code.util';
import { getUser } from '../user/user.service';
import { createSession, findSessions, updateSession } from './session.service';

export async function createUserSessionHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;

  const user = await getUser({ email });

  if (!user) {
    return next(
      new AppError('Invalid email or password.', HttpCode.BadRequest)
    );
  }

  const isValidPassword = await user.comparePassword(password);

  if (!isValidPassword) {
    return next(
      new AppError('Invalid email or password.', HttpCode.BadRequest)
    );
  }

  // TODO: Consider using lean instead
  const session = await createSession(user._id, req.get('user-agent')!).save();

  const userWithNoPassword = omit(user.toJSON(), 'password');

  const accessToken = signJwt(
    { ...userWithNoPassword, session: session._id },
    {
      expiresIn: environment.accessTokenTtl
    }
  );

  const refreshToken = signJwt(
    { ...userWithNoPassword, session: session._id },
    { expiresIn: environment.refreshTokenTtl }
  );

  res.cookie('accessToken', accessToken, {
    ...cookieOptions,
    maxAge: environment.accessTokenTtl
  });

  res.cookie('refreshToken', refreshToken, {
    ...cookieOptions,
    maxAge: environment.refreshTokenTtl
  });

  res.json({ accessToken, refreshToken });
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const sessions = await findSessions({ user: userId, isValid: true });

  res.send(sessions);
}

export async function deleteUserSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { isValid: false });

  return res.send({
    accessToken: null,
    refreshToken: null
  });
}
