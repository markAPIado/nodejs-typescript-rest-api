import server from '../../../../index';
import { disconnectDb } from '../../../database';
import { handleServerShutdown } from '../server-shutdown.handler';

describe('handleServerShutdown', () => {
  afterEach(async () => {
    await server.close();
    await disconnectDb();
  });

  it('should handle SIGTERM signals', () => {
    const closeSpy = jest
      .spyOn(server, 'close')
      .mockImplementationOnce((cb) => {
        const mockServer = {
          close: jest.fn()
        };
        if (cb) {
          cb();
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return mockServer as any;
      });

    handleServerShutdown(server);

    process.emit('SIGTERM');

    expect(closeSpy).toHaveBeenCalled();
  });
});
