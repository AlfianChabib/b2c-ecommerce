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

export type RegisterEmail = {
  email: string;
};

export interface RegisterEmailPayload {
  email: string;
}

export interface ResponseRegisterEmail {
  email: string;
  url: string;
}

export type RefreshTokenPayload = {
  refreshToken: string;
  userId: number;
};

export type CheckTokenPayload = {
  token: string;
};

export type CompleteRegisterPayload = {
  token: string;
  username: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type ResponseLogin = {
  accessToken: string;
  refreshToken: string;
};
