import { HttpCode } from '../http-code.util';
import { AppError } from '../app-error.util';

describe('AppError', () => {
  it('should create an instance with the correct properties', () => {
    const message = 'Test error message';
    const statusCode = HttpCode.BadRequest;

    const error = new AppError(message, statusCode);

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe(message);
    expect(error.statusCode).toBe(statusCode);
    expect(error.status).toBe('fail');
    expect(error.isOperational).toBe(true);
  });

  it('should set status to "error" for 5xx status codes', () => {
    const message = 'Test error message';
    const statusCode = HttpCode.InternalServerError;

    const error = new AppError(message, statusCode);

    expect(error.status).toBe('error');
  });

  it('should set isOperational to false for 5xx status codes', () => {
    const message = 'Test error message';
    const statusCode = HttpCode.InternalServerError;

    const error = new AppError(message, statusCode);

    expect(error.isOperational).toBe(false);
  });
});
