import { connectDb } from './shared/database';
import initMiddlewares from './shared/middlewares';
import initRoutes from './shared/routes';
import startServer from './shared/server';
import { handleExceptionAndRejectionError } from './shared/server/error-handler/exception-and-rejection-error.handler';
import { handleServerShutdown } from './shared/server/error-handler/server-shutdown.handler';
import createApp from './shared/server/express/create-app';

const app = createApp();

handleExceptionAndRejectionError();

connectDb();

initMiddlewares(app);
initRoutes(app);

const server = startServer(app);

handleServerShutdown(server);

export default server;
