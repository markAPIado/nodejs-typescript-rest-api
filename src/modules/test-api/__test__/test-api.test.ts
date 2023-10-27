import supertest from 'supertest';
import server from '../../../index';
import { disconnectDb } from '../../../shared/database';
import { TEST_API_ROUTE } from '../test-api.routes';
import { HttpCode } from '../../../shared/server/http/http-code.util';

const DOES_NOT_EXIST_ROUTE = '/doesnotexist';

describe('test route', () => {
  afterEach(async () => {
    await server.close();
  });

  afterAll(async () => {
    await disconnectDb();
  });

  describe(TEST_API_ROUTE + ': Given a route that exists', () => {
    it(`should return ${HttpCode.Ok}`, async () => {
      const response = await supertest(server).get(TEST_API_ROUTE);
      expect(response.status).toBe(HttpCode.Ok);
    });
  });

  describe(`${DOES_NOT_EXIST_ROUTE}: Given a route that does NOT exist`, () => {
    it(`should return ${HttpCode.NotFound}`, async () => {
      const response = await supertest(server).get(DOES_NOT_EXIST_ROUTE);
      expect(response.status).toBe(HttpCode.NotFound);
    });
  });
});
