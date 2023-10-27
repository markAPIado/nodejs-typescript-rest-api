import { object, string } from 'zod';
import { UserErrorMessages, UserMinMaxLength } from '../user/user.constants';

export const createSessionSchema = object({
  body: object({
    email: string({
      required_error: UserErrorMessages.EmailRequired
    }),
    password: string({
      required_error: UserErrorMessages.PasswordRequired
    }).min(
      UserMinMaxLength.PasswordMinLength,
      UserErrorMessages.PasswordMinLength
    )
  }).strict()
});
