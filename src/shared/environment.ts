import 'dotenv/config';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Staging = 'staging',
  Test = 'test'
}

const environment = {
  nodeEnv: process.env.NODE_ENV,
  host: process.env.HOST,
  port: process.env.PORT,
  mongoUrl: `${process.env.MONGO_URI}${process.env.MONGO_DB_NAME}-${process.env.NODE_ENV}`,
  privateKey: process.env.PRIVATE_KEY,
  publicKey: process.env.PUBLIC_KEY,
  morganEnabled: !!process.env.MORGAN_ENABLED,
  mongoDbLoggerEnabled: !!process.env.MONGODB_LOGGER_ENABLED,
  corsOrigin: process.env.CORS_ORIGIN,
  saltWorkFactor: parseInt(process.env.SALT_WORK_FACTOR as string),
  accessTokenTtl: parseInt(process.env.ACCESS_TOKEN_TTL as string) * 1000 * 60, // minutes
  refreshTokenTtl:
    parseInt(process.env.REFRESH_TOKEN_TTL as string) * 1000 * 60, // minutes
  cookieAllowedDomain: process.env.COOKIE_ALLOWED_DOMAIN
};

export default environment;
