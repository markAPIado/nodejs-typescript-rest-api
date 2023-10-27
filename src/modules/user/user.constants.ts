export const UserMinMaxLength = {
  EmailMinLength: 5,
  EmailMaxLength: 50,
  FirstNameMinLength: 2,
  FirstNameMaxLength: 256,
  LastNameMinLength: 2,
  LastNameMaxLength: 256,
  PasswordMinLength: 6,
  PasswordMaxLength: 100
} as const;

export const UserErrorMessages = {
  EmailRequired: 'Email is required',
  EmailUnique: 'Email must be unique',
  EmailMinLength: `Email must be at least ${UserMinMaxLength.EmailMinLength} characters long`,
  EmailMaxLength: `Email must be less than ${UserMinMaxLength.EmailMaxLength} characters long`,
  EmailInvalidFormat: 'Invalid email format',
  FirstNameRequired: 'First name is required',
  FirstNameMinLength: `First name must be at least ${UserMinMaxLength.FirstNameMinLength} characters long`,
  FirstNameMaxLength: `First name must be less than ${UserMinMaxLength.FirstNameMaxLength} characters long`,
  LastNameRequired: 'Last name is required',
  LastNameMinLength: `Last name must be at least ${UserMinMaxLength.LastNameMinLength} characters long`,
  LastNameMaxLength: `Last name must be less than ${UserMinMaxLength.LastNameMaxLength} characters long`,
  PasswordRequired: 'Password is required',
  PasswordMinLength: `Password must be at least ${UserMinMaxLength.PasswordMinLength} characters long`,
  PasswordMaxLength: `Password must be less than ${UserMinMaxLength.PasswordMaxLength} characters long`
} as const;
