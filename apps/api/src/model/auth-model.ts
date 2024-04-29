import { User } from '@prisma/client';

export enum Provider {
  GOOGLE = 'Google',
  FACEBOOK = 'Facebook',
  GITHUB = 'Github',
  LINKEDIN = 'LinkedIn',
}

export type GoogleUserPayload = {
  email: string;
  username: string;
  image: string;
  provider: Provider;
};

export interface ResponseSocialAuth extends User {
  id: number;
  email: string;
}

export type RefreshTokenPayload = {
  refreshToken: string;
  userId: number;
};
