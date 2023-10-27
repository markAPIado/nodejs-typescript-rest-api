import { CookieOptions } from 'express';
import environment, { Environment } from '../environment';

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  domain: environment.cookieAllowedDomain,
  path: '/',
  sameSite: 'strict',
  secure: environment.nodeEnv === Environment.Production ? true : false
};
