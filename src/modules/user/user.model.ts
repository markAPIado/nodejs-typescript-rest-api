import { HydratedDocument, Model, Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import environment from '../../shared/environment';
import { UserErrorMessages, UserMinMaxLength } from './user.constants';
import { AppError } from '../../shared/server/http/app-error.util';
import { HttpCode } from '../../shared/server/http/http-code.util';
import { CreateUserInputBody } from './user.schema';
import { Timestamps } from '../../shared/entities/mongoose/base.interface';

export const USER = 'User';

export interface IUser extends CreateUserInputBody, Timestamps {}

export interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Note: Record<string, never> is used to avoid passing in {} as the type
type UserModel = Model<IUser, Record<string, never>, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      minlength: UserMinMaxLength.EmailMinLength,
      maxlength: UserMinMaxLength.EmailMaxLength,
      trim: true,
      validate: {
        validator: (value: string) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        message: UserErrorMessages.EmailInvalidFormat
      }
    },
    firstName: {
      type: String,
      minlength: UserMinMaxLength.FirstNameMinLength,
      maxlength: UserMinMaxLength.FirstNameMaxLength,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      minlength: UserMinMaxLength.LastNameMinLength,
      maxlength: UserMinMaxLength.LastNameMaxLength,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: UserMinMaxLength.PasswordMinLength,
      maxlength: UserMinMaxLength.PasswordMaxLength,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre(/^save$/, async function (next) {
  const user = this as HydratedDocument<IUser>;

  if (!user.isModified('password')) return next();

  if (!environment.saltWorkFactor) {
    return next(
      new AppError(
        'Salt work factor is not defined',
        HttpCode.InternalServerError
      )
    );
  }

  const salt = await bcrypt.genSalt(environment.saltWorkFactor);

  const hashedPassword = await bcrypt.hash(user.password, salt);

  user.password = hashedPassword;

  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await bcrypt
    .compare(candidatePassword, this.password)
    .catch(() => false);
};

const User = model<IUser, UserModel>(USER, userSchema);

export default User;
