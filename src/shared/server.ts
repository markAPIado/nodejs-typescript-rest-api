import environment from './environment';
import { logger } from './logger';
import { Application } from 'express';

function startServer(app: Application) {
  const server = app.listen(environment.port, () => {
    logger.info(`Server is running on ${environment.host}:${environment.port}`);
  });

  return server;
}

export default startServer;
