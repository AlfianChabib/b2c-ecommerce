import { User } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { callbackHelper } from '../helper/auth/social-helper';

export class AuthController {
  async registerEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;

      return res.status(200).send({ email });
    } catch (error) {
      next(error);
    }
  }

  async googleCallback(req: Request, res: Response, next: NextFunction) {
    try {
      passport.authenticate('google', async (err: Error, user: User) => {
        callbackHelper(user, err, res, next);
      })(req, res);
    } catch (error) {
      next(error);
    }
  }
}
