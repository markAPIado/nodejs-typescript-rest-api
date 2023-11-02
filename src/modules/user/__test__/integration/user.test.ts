import supertest from 'supertest';
import server from '../../../../index';
import { UserRoutes } from '../../user.routes';
import User from '../../user.model';
import { HttpCode } from '../../../../shared/server/http/http-code.util';
import { disconnectDb } from '../../../../shared/database';
import { signJwt } from '../../../../shared/security/jwt/jwt.utils';
import { omit } from 'lodash';

const newUser = {
  email: 'markapiado.me@gmail.com',
  firstName: 'Mark',
  lastName: 'Apiado',
  password: '123456'
};

describe(UserRoutes.UserApiPath, () => {
  afterEach(async () => {
    await User.deleteOne();
    await server.close();
  });

  afterAll(async () => {
    await disconnectDb();
  });

  describe(`POST ${UserRoutes.UserApiPath}`, () => {
    it(`should return status code: ${HttpCode.Created}`, async () => {
      const response = await supertest(server)
        .post(UserRoutes.UserApiPath)
        .send(newUser);

      expect(response.status).toBe(HttpCode.Created);
      expect(response.body.data).toHaveProperty('_id');
      expect(response.body.data).toHaveProperty('email', newUser.email);
      expect(response.body.data).toHaveProperty('firstName', newUser.firstName);
      expect(response.body.data).toHaveProperty('lastName', newUser.lastName);
      expect(response.body.data).not.toHaveProperty('password');
      expect(response.body.data).toHaveProperty('createdAt');
      expect(response.body.data).toHaveProperty('updatedAt');
    }, 10000);

    it(`should return status code: ${HttpCode.BadRequest} when email is already taken`, async () => {
      await new User(newUser).save();

      const response = await supertest(server)
        .post(UserRoutes.UserApiPath)
        .send(newUser);

      expect(response.status).toBe(HttpCode.BadRequest);
      expect(response.body).toHaveProperty('message', 'User already exists');
    });
  });

  describe(`GET ${UserRoutes.UserApiPath}${UserRoutes.MePath}`, () => {
    it(`should return the current user and status code: ${HttpCode.Ok}`, async () => {
      const user = await new User(newUser).save();

      const response = await supertest(server)
        .get(UserRoutes.UserApiPath + UserRoutes.MePath)
        .set(
          'Authorization',
          `Bearer ${signJwt(omit(user.toJSON(), 'password'))}`
        );

      expect(response.status).toBe(HttpCode.Ok);
      expect(response.body.data).toHaveProperty('_id');
      expect(response.body.data).toHaveProperty('email', newUser.email);
      expect(response.body.data).toHaveProperty('firstName', newUser.firstName);
      expect(response.body.data).toHaveProperty('lastName', newUser.lastName);
      expect(response.body.data).not.toHaveProperty('password');
      expect(response.body.data).toHaveProperty('createdAt');
      expect(response.body.data).toHaveProperty('updatedAt');
    });
  });
});
