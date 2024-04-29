import { Router } from 'express';
import { AuthRouter } from './auth-router';
import { UserRouter } from './user-router';

export class ApiRouter {
  private router: Router;
  private authRouter: AuthRouter;
  private userRouter: UserRouter;

  constructor() {
    this.router = Router();
    this.authRouter = new AuthRouter();
    this.userRouter = new UserRouter();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use('/auth', this.authRouter.getRouter());
    this.router.use('/user', this.userRouter.getRouter());
  }

  public getRouter(): Router {
    return this.router;
  }
}
