import { Request, Response, Router } from 'express';

export const HEALTH_CHECK_ROUTE = '/health-check';

const healthCheckRouter = Router();

healthCheckRouter.get(
  HEALTH_CHECK_ROUTE,
  async (req: Request, res: Response) => {
    res.sendStatus(200);
  }
);

export default healthCheckRouter;
