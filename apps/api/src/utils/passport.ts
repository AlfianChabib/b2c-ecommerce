import { Strategy as GoogleStrategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import { strategyHelper } from '../helper/auth/social-helper';
import { Provider } from '../model/auth-model';

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope: ['profile', 'email'],
  },
  async (_accessToken: string, _refreshToken: string, profile: Profile, done: VerifyCallback) => {
    try {
      await strategyHelper(profile, Provider.GOOGLE, done);
    } catch (error: any) {
      done(null, error);
    }
  },
);

const strategies = { google: googleStrategy };
export default strategies;
