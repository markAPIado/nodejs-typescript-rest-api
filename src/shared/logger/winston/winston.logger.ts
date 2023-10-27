import 'express-async-errors'; // NOTE: This package is used to handle async errors in express. It is used to avoid the try/catch block in the controller and delegates the error handling to the error handler middleware.
import 'winston-mongodb';
import { createLogger, format, transports } from 'winston';
import environment, { Environment } from '../../environment';
import {
  consoleLoggerTransport,
  fileLoggerTransport
} from './winston.transports';

const winstonLogger = createLogger({
  format: format.combine(format.metadata(), format.timestamp(), format.json()),
  transports: [consoleLoggerTransport, fileLoggerTransport],
  exitOnError: false
});

if (
  environment.mongoDbLoggerEnabled &&
  environment.nodeEnv !== Environment.Test
) {
  const db = `${environment.mongoUrl}-logs`;
  const dbTransport = new transports.MongoDB({
    db,
    level: 'error',
    options: {
      useUnifiedTopology: true
    }
  });

  winstonLogger.info(`Logger is connecting to ${db}`);
  winstonLogger.add(dbTransport);
}

export default winstonLogger;
