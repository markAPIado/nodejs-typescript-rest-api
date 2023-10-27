import { FilterQuery, HydratedDocument, Types, UpdateQuery } from 'mongoose';
import Session, { ISession } from './session.model';
import { IUser } from '../user/user.model';
import { signJwt, verifyJwt } from '../../shared/security/jwt/jwt.utils';
import { get, omit } from 'lodash';
import { getUser } from '../user/user.service';
import environment from '../../shared/environment';

export function createSession(
  userId: Types.ObjectId,
  userAgent: string
): HydratedDocument<ISession> {
  return new Session({
    user: userId,
    userAgent
  });
}

export function findSessions(filter: FilterQuery<IUser>) {
  return Session.find(filter).lean();
}

export function updateSession(
  query: FilterQuery<IUser>,
  update: UpdateQuery<ISession>
) {
  return Session.updateOne(query, update);
}

export async function reIssueAccessToken(
  refreshToken: string
): Promise<string | false> {
  try {
    const { decoded } = await verifyJwt(refreshToken);

    if (!decoded || !get(decoded, 'session')) return false;

    const session = await Session.findById(get(decoded, 'session'));

    if (!session || !session.isValid) return false;

    const user = await getUser({ _id: session.user });

    if (!user) return false;

    const userWithNoPassword = omit(user.toJSON(), 'password');

    const accessToken = signJwt(
      { ...userWithNoPassword, session: session._id },
      { expiresIn: environment.refreshTokenTtl }
    );

    return accessToken;
  } catch (error) {
    return false;
  }
}
