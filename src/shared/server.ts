import { Express } from 'express';
import environment from './environment';
import { logger } from './logger';

function startServer(app: Express) {
  const server = app.listen(environment.port, () => {
    logger.info(`Server is running on ${environment.host}:${environment.port}`);
  });

  return server;
}

export default startServer;
