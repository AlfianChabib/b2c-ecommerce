import { z, ZodType } from 'zod';
import { Provider } from '../model/auth-model';

export class AuthValidation {
  static readonly REGISTER_EMAIL: ZodType = z.object({
    email: z.string().email(),
  });

  static readonly CHECK_URL: ZodType = z.object({
    token: z.string(),
  });

  static readonly COMPLETE_REGISTER_PAYLOAD: ZodType = z.object({
    token: z.string(),
    password: z.string().min(6).max(100),
    username: z.string().min(3).max(100),
  });

  static readonly CREATE_NEW_USER_GOOGLE: ZodType = z.object({
    email: z.string().email(),
    username: z.string().min(3).max(100),
    image: z.string().url(),
    provider: z.enum([Provider.GOOGLE, Provider.FACEBOOK, Provider.GITHUB, Provider.LINKEDIN]),
  });

  static readonly LOGIN: ZodType = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(100),
  });

  static readonly REFRESH_TOKEN_PAYLOAD: ZodType = z.object({
    refreshToken: z.string(),
    userId: z.number(),
  });
}
