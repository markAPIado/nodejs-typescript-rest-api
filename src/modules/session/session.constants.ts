export const SessionMinMaxLength = {
  UserAgentMinLength: 2,
  UserAgentMaxLength: 256
} as const;

export const SessionErrorMessages = {
  UserAgentRequired: 'User agent is required',
  UserAgentMinLength: `User agent must be at least ${SessionMinMaxLength.UserAgentMinLength} characters long`,
  UserAgentMaxLength: `User agent must be less than ${SessionMinMaxLength.UserAgentMaxLength} characters long`
} as const;
