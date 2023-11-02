import supertest from 'supertest';
import server from '../../../index';
import { disconnectDb } from '../../../shared/database';
import { HEALTH_CHECK_ROUTE } from '../health-check.routes';
import { HttpCode } from '../../../shared/server/http/http-code.util';

const DOES_NOT_EXIST_ROUTE = '/doesnotexist';

describe('Health Check', () => {
  afterEach(async () => {
    await server.close();
  });

  afterAll(async () => {
    await disconnectDb();
  });

  describe(HEALTH_CHECK_ROUTE + ': Given a route that exists', () => {
    it(`should return ${HttpCode.Ok}`, async () => {
      const response = await supertest(server).get(HEALTH_CHECK_ROUTE);
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
