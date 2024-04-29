import { Router } from 'express';
import passport from 'passport';
import { AuthController } from '../controller/auth-controller';
import { Validation } from '../helper/validation';
import { AuthValidation } from '../validation/auth-validation';

export class AuthRouter {
  private router: Router;
  private authController: AuthController;

  constructor() {
    this.router = Router();
    this.authController = new AuthController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/register-email',
      Validation.validateBody(AuthValidation.REGISTER_EMAIL),
      this.authController.registerEmail,
    );

    // google auth
    this.router.get('/google', passport.authenticate('google'));
    this.router.get('/google/callback', this.authController.googleCallback);
  }

  getRouter(): Router {
    return this.router;
  }
}
