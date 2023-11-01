import { NextFunction, Request, Response } from 'express';
import { reIssueAccessToken } from '../../modules/session/session.service';
import { verifyJwt } from '../security/jwt/jwt.utils';
import { AppError } from '../server/http/app-error.util';
import { HttpCode } from '../server/http/http-code.util';
import { get } from 'lodash';
import { cookieOptions } from '../security/cookie-options';
import environment from '../environment';

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken =
    get(req, 'cookies.accessToken') ||
    get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');

  const refreshToken =
    get(req, 'cookies.refreshToken') ||
    (get(req, 'headers.x-refresh') as string);

  if (!accessToken) {
    return next(new AppError('Forbidden', HttpCode.Forbidden));
  }

  const { decoded, expired } = await verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken(refreshToken);

    if (newAccessToken) {
      res.setHeader('x-access-token', newAccessToken);

      res.cookie('accessToken', accessToken, {
        ...cookieOptions,
        maxAge: environment.accessTokenTtl
      });

      const { decoded } = await verifyJwt(newAccessToken);

      res.locals.user = decoded;

      return next();
    }
  }

  next(new AppError('Forbidden', HttpCode.Forbidden));
};

export default deserializeUser;
