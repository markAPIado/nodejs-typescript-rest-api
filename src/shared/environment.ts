import 'dotenv/config';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Staging = 'staging',
  Test = 'test'
}

/**
 * Manage the environment variables in this file and add more if needed. The variables are loaded from the .env file in the root of the project.
 * This approach allows developers to manage the environment variables in a single file and not have to worry about setting them in the different environments.
 */

const environment = {
  nodeEnv: process.env.NODE_ENV,
  host: process.env.HOST,
  port: process.env.PORT,
  mongoUrl: `${process.env.MONGO_URI}${process.env.MONGO_DB_NAME}-${process.env.NODE_ENV}`, // Creates a new database for each active environment (test, development, production)
  privateKey: process.env.PRIVATE_KEY,
  publicKey: process.env.PUBLIC_KEY,
  morganEnabled: !!process.env.MORGAN_ENABLED, // "!!" converts the value to boolean (1 = true, empty = false)
  mongoDbLoggerEnabled: !!process.env.MONGODB_LOGGER_ENABLED, // "!!" converts the value to boolean (1 = true, empty = false)
  corsOrigin: process.env.CORS_ORIGIN,
  saltWorkFactor: parseInt(process.env.SALT_WORK_FACTOR as string),
  accessTokenTtl: parseInt(process.env.ACCESS_TOKEN_TTL as string) * 1000 * 60, // minutes
  refreshTokenTtl:
    parseInt(process.env.REFRESH_TOKEN_TTL as string) * 1000 * 60, // minutes
  cookieAllowedDomain: process.env.COOKIE_ALLOWED_DOMAIN
  /**
   * Add more environment variables here
   */
};

export default environment;
