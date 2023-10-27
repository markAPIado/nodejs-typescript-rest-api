import { Request, Response, Router } from 'express';

export const TEST_API_ROUTE = '/health-check';

const healthCheckRouter = Router();

healthCheckRouter.get(
  `${TEST_API_ROUTE}/`,
  async (req: Request, res: Response) => {
    res.sendStatus(200);
  }
);

export default healthCheckRouter;
