import { connectDb, disconnectDb } from '../../../../shared/database';
import environment from '../../../../shared/environment';
import User from '../../user.model';

describe('User Model', () => {
  beforeAll(async () => {
    await connectDb();
  });

  afterEach(async () => {
    await User.deleteOne();
  });

  afterAll(async () => {
    await disconnectDb();
  });

  const user = {
    email: 'markapiado.me@gmail.com',
    password: '123456',
    firstName: 'Mark',
    lastName: 'Apiado'
  };

  describe('pre save: password hashing', () => {
    it('should hash the password before saving the new user', async () => {
      const newUser = new User(user);

      await newUser.save();

      expect(newUser.password).not.toBe(user.password);
    });

    it('should return an ne AppError if there is NO saltFactor ', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      environment.saltWorkFactor = undefined as any;

      const newUser = new User(user);

      await expect(newUser.save()).rejects.toThrow(
        'Salt work factor is not defined'
      );
    });

    it('should not hash password if the user is Updated but the password is NOT modified', async () => {
      environment.saltWorkFactor = 10;

      const newUser = new User(user);
      await newUser.save();

      newUser.firstName = 'Marky';
      await newUser.save();

      expect(newUser.password).not.toBe(user.password);
    });
  });

  describe('comparePassword', () => {
    it('should check if the comparePassword is defined.', async () => {
      expect(User.prototype.comparePassword).toBeDefined();
    });

    it('should return true if the password is correct', async () => {
      const newUser = new User(user);
      await newUser.save();

      const isMatch = await newUser.comparePassword(user.password);

      expect(isMatch).toBe(true);
    });
  });
});
