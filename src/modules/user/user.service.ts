import { FilterQuery, HydratedDocument } from 'mongoose';
import User, { IUser, IUserMethods } from './user.model';
import { CreateUserInputBody } from './user.schema';

export function createUser(
  input: CreateUserInputBody
): HydratedDocument<IUser> {
  return new User(input);
}

export function getUser(
  filter: FilterQuery<IUser>
): Promise<HydratedDocument<IUser & IUserMethods> | null> {
  return User.findOne(filter).exec();
}
