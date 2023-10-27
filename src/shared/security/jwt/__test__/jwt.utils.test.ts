import { signJwt, verifyJwt } from '../jwt.utils';

describe('jwt.utils', () => {
  const payload = {
    _id: '123456789',
    email: 'email@test.com',
    firstName: 'John',
    lastName: 'Doe'
  };
  const options = {
    expiresIn: '1h'
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let token: string;

  describe('signJwt', () => {
    it('should check if the function is defined', () => {
      expect(signJwt).toBeDefined();
    });

    it('should return a valid JWT', () => {
      token = signJwt(payload, options);

      expect(token).toBeDefined();
    });
  });

  describe('verifyJwt', () => {
    it('should check if the function is defined', () => {
      expect(verifyJwt).toBeDefined();
    });

    it('should return a valid JWT', async () => {
      const result = await verifyJwt(token);

      expect(result).toBeDefined();
      expect(result).toHaveProperty('valid', true);
      expect(result).toHaveProperty('expired', false);
      expect(result).toHaveProperty('decoded');
      expect(result.decoded).toMatchObject(payload);
    });

    it('should return an invalid decoded object for an invalid JWT', async () => {
      const token = 'invalid-token';

      const result = await verifyJwt(token);

      expect(result).toBeDefined();
      expect(result).toHaveProperty('valid', false);
      expect(result).toHaveProperty('expired', false);
      expect(result).toHaveProperty('decoded', null);
    });

    it('should return an expired decoded object for an expired JWT', async () => {
      const payload = {
        _id: '123456789',
        email: 'email@test.com',
        firstName: 'John',
        lastName: 'Doe'
      };
      const options = {
        expiresIn: '0s'
      };

      const token = signJwt(payload, options);

      const result = await verifyJwt(token);

      expect(result).toBeDefined();
      expect(result).toHaveProperty('valid', false);
      expect(result).toHaveProperty('expired', true);
      expect(result).toHaveProperty('decoded', null);
    });
  });
});
