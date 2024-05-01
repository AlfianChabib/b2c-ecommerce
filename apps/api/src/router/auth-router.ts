import { Router } from 'express';
import passport from 'passport';
import { AuthController } from '../controller/auth-controller';
import { validateRequest, ValidationType } from '../helper/validation';
import { AuthValidation } from '../validation/auth-validation';
import { requireUser } from '../middleware/auth/authorization';

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
      validateRequest(AuthValidation.REGISTER_EMAIL, ValidationType.body),
      this.authController.registerEmail,
    );
    this.router.post(
      '/register-check',
      validateRequest(AuthValidation.CHECK_URL, ValidationType.body),
      this.authController.checkVerifyExpired,
    );
    this.router.post(
      '/register-complete',
      validateRequest(AuthValidation.COMPLETE_REGISTER_PAYLOAD, ValidationType.body),
      this.authController.completeRegister,
    );

    this.router.post('/refresh', this.authController.refreshNewToken);

    this.router.post('/login', validateRequest(AuthValidation.LOGIN, ValidationType.body), this.authController.login);
    this.router.post('/logout', requireUser, this.authController.logout);

    // google auth
    this.router.get('/google', passport.authenticate('google'));
    this.router.get('/google/callback', this.authController.googleCallback);
  }

  getRouter(): Router {
    return this.router;
  }
}
