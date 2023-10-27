import { TypeOf, object, string } from 'zod';
import { UserErrorMessages, UserMinMaxLength } from './user.constants';
import { IUser } from './user.model';

export const createUserSchema = object({
  body: object({
    email: string({
      required_error: UserErrorMessages.EmailRequired
    })
      .min(UserMinMaxLength.EmailMinLength, UserErrorMessages.EmailMinLength)
      .max(UserMinMaxLength.EmailMaxLength, UserErrorMessages.EmailMaxLength)
      .email(UserErrorMessages.EmailInvalidFormat),
    firstName: string({
      required_error: UserErrorMessages.FirstNameRequired
    })
      .min(
        UserMinMaxLength.FirstNameMinLength,
        UserErrorMessages.FirstNameMinLength
      )
      .max(
        UserMinMaxLength.FirstNameMaxLength,
        UserErrorMessages.FirstNameMaxLength
      ),
    lastName: string({
      required_error: UserErrorMessages.LastNameRequired
    })
      .min(
        UserMinMaxLength.LastNameMinLength,
        UserErrorMessages.LastNameMinLength
      )
      .max(
        UserMinMaxLength.LastNameMaxLength,
        UserErrorMessages.LastNameMaxLength
      ),
    password: string({
      required_error: UserErrorMessages.PasswordRequired
    })
      .min(
        UserMinMaxLength.PasswordMinLength,
        UserErrorMessages.PasswordMinLength
      )
      .max(
        UserMinMaxLength.PasswordMaxLength,
        UserErrorMessages.PasswordMaxLength
      )
  }).strict()
});

export type CreateUserInputBody = TypeOf<typeof createUserSchema>['body'];
export type CreateUserResponse = {
  data: Omit<IUser, 'password'>;
};
