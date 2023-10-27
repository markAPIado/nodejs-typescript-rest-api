import { connectDb, disconnectDb } from '../../../../shared/database';
import Session from '../../session.model';
import { reIssueAccessToken } from '../../session.service';

describe('reIssueAccessToken', () => {
  beforeAll(async () => {
    await connectDb();
  });

  afterEach(async () => {
    await Session.deleteMany({});
  });

  afterAll(async () => {
    await disconnectDb();
  });

  it('should return false if the refresh token is invalid', async () => {
    const refreshToken = 'invalid-token';
    const result = await reIssueAccessToken(refreshToken);
    expect(result).toBe(false);
  });
});
