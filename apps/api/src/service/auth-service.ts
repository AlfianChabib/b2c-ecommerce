import { Response } from 'express';
import { prisma } from '../app/database';
import { hashToken } from '../helper/crypto/hash-token';
import { Validation } from '../helper/validation';
import { AuthValidation } from '../validation/auth-validation';
import { GoogleUserPayload, RefreshTokenPayload, ResponseSocialAuth } from '../model/auth-model';

export class AuthService {
  static async registerUserGoogle(payload: GoogleUserPayload): Promise<ResponseSocialAuth> {
    const data = Validation.validate(AuthValidation.CREATE_NEW_USER_GOOGLE, payload);

    return await prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        profile: { create: { image: data.image } },
        authInfo: {
          create: { authType: 'Social', socialAuth: { create: { email: data.email, provider: data.provider } } },
        },
      },
    });
  }

  static async addRefreshToken(payload: RefreshTokenPayload): Promise<void> {
    const data = Validation.validate(AuthValidation.REFRESH_TOKEN_PAYLOAD, payload);
    const hashedToken = hashToken(data.refreshToken);

    await prisma.user.update({
      where: { id: data.userId },
      select: { id: true },
      data: {
        authInfo: { update: { data: { refreshToken: { create: { hashedToken: hashedToken } } } } },
      },
    });
  }

  static async sendRefreshToken(res: Response, refreshToken: string) {
    return res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: true,
      path: '/',
    });
  }
}
