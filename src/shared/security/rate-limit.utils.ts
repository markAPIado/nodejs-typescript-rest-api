import { rateLimit } from 'express-rate-limit';

interface RateLimitOptions {
  max: number;
  minutes: number;
  message?: string;
}

export function createRateLimit({
  max,
  minutes,
  message = 'Too many requests.'
}: RateLimitOptions) {
  return rateLimit({
    max,
    windowMs: 1000 * 60 * minutes,
    message
  });
}
