import mongoose from 'mongoose';
import environment from '../../environment';
import { logger } from '../../logger';

async function connectMongoDb() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(environment.mongoUrl);
    logger.info('Connected to MongoDB:' + environment.mongoUrl);
  }
}

export async function disconnectMongoDb() {
  if (mongoose.connection.readyState === 0) {
    logger.info('Mongoose is already disconnected');
    return;
  }

  await mongoose.disconnect();
  logger.info('Disconnected from MongoDB');
}

export default connectMongoDb;
