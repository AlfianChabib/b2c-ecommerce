import { z, ZodObject, ZodType } from 'zod';
import { Provider } from '../model/auth-model';

export class AuthValidation {
  static readonly REGISTER_EMAIL = z.object({
    email: z.string().email(),
  });

  static readonly CREATE_NEW_USER_GOOGLE: ZodType = z.object({
    email: z.string().email(),
    username: z.string().min(3).max(100),
    image: z.string().url(),
    provider: z.enum([Provider.GOOGLE, Provider.FACEBOOK, Provider.GITHUB, Provider.LINKEDIN]),
  });

  static readonly REFRESH_TOKEN_PAYLOAD: ZodType = z.object({
    refreshToken: z.string(),
    userId: z.number(),
  });
}
