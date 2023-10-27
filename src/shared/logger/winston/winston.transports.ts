import { format, transports } from 'winston';
import environment, { Environment } from '../../environment';

/**
 * NOTE: This is the directory where the logs will be stored. In production, it is recommended to store the logs in a different directory. Check the Dockerfile. In test mode, the logs will be stored in the logs directory.
 */
const logsDir =
  environment.nodeEnv === Environment.Test ? 'logs' : '/var/log/nodeapp';

export const consoleLoggerTransport = new transports.Console({
  format: format.combine(
    format.colorize({
      all: true
    }),
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  level: 'info'
});

export const consoleErrorLoggerTransport = new transports.Console({
  format: format.colorize({
    all: true
  }),
  level: 'error'
});

export const fileLoggerTransport = new transports.File({
  filename: `${logsDir}/combined.log`,
  level: 'error'
});

export const uncaughtExceptionTransport = new transports.File({
  filename: `${logsDir}/uncaughtExceptions.log`,
  level: 'error',
  handleExceptions: true
});

export const unhandledRejectionTransport = new transports.File({
  filename: `${logsDir}/unhandledRejections.log`,
  level: 'error',
  handleRejections: true
});
