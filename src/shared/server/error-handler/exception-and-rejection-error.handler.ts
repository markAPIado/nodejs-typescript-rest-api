import { createLogger } from 'winston';
import {
  consoleErrorLoggerTransport,
  uncaughtExceptionTransport,
  unhandledRejectionTransport
} from '../../logger/winston/winston.transports';
import { debug } from 'console';

export function handleExceptionAndRejectionError() {
  createLogger({
    exceptionHandlers: [
      consoleErrorLoggerTransport,
      uncaughtExceptionTransport
    ],
    rejectionHandlers: [
      consoleErrorLoggerTransport,
      unhandledRejectionTransport
    ],
    exitOnError: false
  });

  process.on('uncaughtException', () => {
    debug('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    process.exit(1);
  });
}
