import { Router } from 'express';
import { UserController } from '../controller/user-controller';
import { requireUser } from '../middleware/auth/authorization';

export class UserRouter {
  private router: Router;
  private userController: UserController;

  constructor() {
    this.userController = new UserController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/profile', requireUser, this.userController.profile);
  }

  getRouter(): Router {
    return this.router;
  }
}
