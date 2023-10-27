import { HydratedDocument } from 'mongoose';
import supertest from 'supertest';
import server from '../../../../index';
import { disconnectDb } from '../../../../shared/database';
import { HttpCode } from '../../../../shared/server/http/http-code.util';
import User, { IUser } from '../../../user/user.model';
import Session from '../../session.model';
import { SESSION_ROUTES } from '../../session.routes';

describe('Session module', () => {
  let user: HydratedDocument<IUser>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let accessToken: string;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let refreshToken: string;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  afterEach(async () => {
    await User.deleteOne();
    await Session.deleteOne();
    await server.close();
  });

  beforeAll(async () => {
    user = await new User({
      email: 'markapiado@gmail.com',
      password: 'password',
      firstName: 'Mark',
      lastName: 'Apiado'
    }).save();

    const getTokens = await supertest(server)
      .post(SESSION_ROUTES.BASE)
      .set('User-Agent', 'Test-User-Agent')
      .send({
        email: user.email,
        password: 'password'
      });

    refreshToken = getTokens.body.refreshToken;
    accessToken = getTokens.body.accessToken;
  }, 10000);

  afterAll(async () => {
    await disconnectDb();
  });

  describe(`POST ${SESSION_ROUTES.BASE}`, () => {
    it(`should return with access and refresh tokens`, async () => {
      expect(accessToken).toBeDefined();
      expect(refreshToken).toBeDefined();
    });

    it(`should return ${HttpCode.BadRequest} Bad Request if email is invalid`, async () => {
      await supertest(server)
        .post(SESSION_ROUTES.BASE)
        .send({
          email: 'invalid-email',
          password: 'password'
        })
        .expect(HttpCode.BadRequest);
    });

    it(`should return ${HttpCode.BadRequest} Bad Request if password is invalid`, async () => {
      await supertest(server)
        .post(SESSION_ROUTES.BASE)
        .send({
          email: user.email,
          password: 'invalid-password'
        })
        .expect(HttpCode.BadRequest);
    });
  });

  describe(`GET ${SESSION_ROUTES.BASE}`, () => {
    it(`should return ${HttpCode.Forbidden} if access token is not provided`, async () => {
      const response = await supertest(server).get(SESSION_ROUTES.BASE);

      expect(response.status).toBe(HttpCode.Forbidden);
    });

    it(`should return user's active sessions and status ${HttpCode.Ok} if access token is valid`, async () => {
      user = await new User({
        email: 'markapiado@gmail.com',
        password: 'password',
        firstName: 'Mark',
        lastName: 'Apiado'
      }).save();

      const getTokens = await supertest(server)
        .post(SESSION_ROUTES.BASE)
        .set('User-Agent', 'Test-User-Agent')
        .send({
          email: user.email,
          password: 'password'
        });

      refreshToken = getTokens.body.refreshToken;
      accessToken = getTokens.body.accessToken;

      const response = await supertest(server)
        .get(SESSION_ROUTES.BASE)
        .set('Authorization', `Bearer ${accessToken}`);
      expect(response.status).toBe(HttpCode.Ok);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].user).toBe(user._id.toHexString());
    });
  });

  describe(`DELETE ${SESSION_ROUTES.BASE}`, () => {
    it(`should return ${HttpCode.Forbidden} if access token is not provided`, async () => {
      const response = await supertest(server).delete(SESSION_ROUTES.BASE);

      expect(response.status).toBe(HttpCode.Forbidden);
    });

    it(`should return ${HttpCode.Ok} and refresh and access tokens with null values if access token is valid`, async () => {
      const response = await supertest(server)
        .delete(SESSION_ROUTES.BASE)
        .set('Authorization', `Bearer ${accessToken}`);

      expect(response.status).toBe(HttpCode.Ok);
      expect(response.body.accessToken).toBeNull();
      expect(response.body.refreshToken).toBeNull();
    });
  });
});
