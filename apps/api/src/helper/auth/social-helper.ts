import { NextFunction, Response } from 'express';
import { Profile, VerifyCallback } from 'passport-google-oauth20';
import { generateTokens, sendRefreshToken } from '../jwt/token-helper';
import { User } from '@prisma/client';
import { EmailType, sendEmail } from '../email/email-helper';
import { AuthService } from '../../service/auth-service';
import { getUser } from '../../service/user-service';
import { Provider } from '../../model/auth-model';

export const strategyHelper = async (profile: Profile, provider: Provider, done: VerifyCallback) => {
  try {
    const email = profile._json.email;
    const user = await getUser({ type: 'email', email });
    if (!user) {
      const newUser = await AuthService.registerUserGoogle({
        email: email!,
        username: profile.displayName,
        image: profile._json.picture!,
        provider: provider,
      });
      await sendEmail(EmailType.REGISTERED_NOTIFICATION, { email: newUser.email });
      return done(null, newUser);
    } else {
      return done(null, user);
    }
  } catch (error) {
    throw error;
  }
};

export const callbackHelper = async (user: User, err: Error, res: Response, next: NextFunction) => {
  try {
    if (!user) return res.redirect(`${process.env.BASE_FRONTEND_URL}/login?error=Social authentication failed`);
    if (err) next(err);

    const { accessToken, refreshToken } = generateTokens({ userId: user.id, email: user.email, role: user.role });
    await AuthService.addRefreshToken({ refreshToken: refreshToken, userId: user.id });
    await sendRefreshToken(res, refreshToken);

    return res.redirect(`${process.env.BASE_FRONTEND_URL}/login?accessToken=${accessToken}`);
  } catch (error) {
    next(error);
  }
};
