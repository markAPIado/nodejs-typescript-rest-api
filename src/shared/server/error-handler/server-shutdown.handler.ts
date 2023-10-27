import http from 'http';
import { debug } from 'console';

export function handleServerShutdown(server: http.Server) {
  process.on('unhandledRejection', () => {
    debug('UNHANDLED REJECTION! 💥 Shutting down...');
    server.close(() => {
      process.exit(1);
    });
  });

  process.on('SIGTERM', () => {
    debug('👋 SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
      debug('💥 Process terminated!');
    });
  });
}
