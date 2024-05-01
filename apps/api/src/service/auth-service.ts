import { prisma } from '../app/database';
import { hashToken } from '../helper/crypto/hash-token';
import { Validation } from '../helper/validation';
import { AuthValidation } from '../validation/auth-validation';
import {
  CompleteRegisterPayload,
  GoogleUserPayload,
  LoginPayload,
  RefreshTokenPayload,
  RegisterEmailPayload,
  ResponseLogin,
  ResponseRegisterEmail,
  ResponseSocialAuth,
} from '../model/auth-model';
import { ResponseError } from '../helper/response-error';
import { generateVerifycationToken, verificationUrl, verifyToken } from '../helper/jwt/url-generator';
import dayjs from 'dayjs';
import { comparePassword, hashPassword } from '../helper/bcrypt/password-helper';
import { generateTokens, verifyRefreshToken } from '../helper/jwt/token-helper';
import { IParsedToken } from '../types/jwt';

export class AuthService {
  static async registerUserGoogle(payload: GoogleUserPayload): Promise<ResponseSocialAuth> {
    const data = Validation.validate(AuthValidation.CREATE_NEW_USER_GOOGLE, payload);

    return await prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        profile: { create: { image: data.image, username: data.username } },
        authInfo: {
          create: {
            authType: 'Social',
            confirmed: true,
            socialAuth: { create: { email: data.email, provider: data.provider } },
          },
        },
      },
    });
  }

  static async registerEmail(payload: RegisterEmailPayload): Promise<ResponseRegisterEmail> {
    const data = Validation.validate(AuthValidation.REGISTER_EMAIL, payload);
    const existEmail = await prisma.user.count({ where: { email: data.email } });

    if (existEmail != 0) throw new ResponseError(400, 'Email already exist');
    const createUser = await prisma.user.create({
      data: {
        email: data.email,
        authInfo: { create: { authType: 'Local', localAuth: { create: { email: data.email } } } },
      },
    });
    const expiry = dayjs().add(1, 'hour').toDate();
    const token = generateVerifycationToken({ email: createUser.email, userId: createUser.id, expiry });

    await prisma.user.update({
      where: { id: createUser.id },
      data: {
        authInfo: { update: { localAuth: { update: { verificationCode: hashToken(token), expiryCode: expiry } } } },
      },
    });
    console.log(token);
    const url = verificationUrl(token);

    return { email: createUser.email, url };
  }

  static async checkVerifyExpired(token: string): Promise<{ message: string; email: string }> {
    const data = Validation.validate(AuthValidation.CHECK_URL, { token });
    const { expiry, email } = verifyToken(data.token);

    if (new Date(expiry) < new Date()) throw new ResponseError(400, 'This url has been expired');

    const existedToken = await prisma.user.findUnique({
      where: { email },
      include: { authInfo: { include: { localAuth: true } } },
    });

    if (!existedToken?.authInfo?.localAuth?.verificationCode)
      throw new ResponseError(400, 'Token is invalid or expired');

    return { message: 'Token is valid', email };
  }

  static async registerComplete(data: CompleteRegisterPayload) {
    const { password, username, token } = data;
    const response = await this.checkVerifyExpired(token);

    if (!response.email) throw new ResponseError(400, 'This url has been expired');

    const hashedPassword: string = hashPassword(password);
    await prisma.user.update({
      where: { email: response.email },
      data: {
        username,
        profile: { create: { username: username } },
        authInfo: {
          update: {
            confirmed: true,
            localAuth: { update: { password: hashedPassword, verificationCode: null, expiryCode: null } },
          },
        },
      },
    });
  }

  static async login(payload: LoginPayload): Promise<ResponseLogin> {
    const data = Validation.validate(AuthValidation.LOGIN, payload);
    const user = await prisma.user.findUnique({
      where: { email: data.email },
      include: { authInfo: { include: { socialAuth: true, localAuth: true } } },
    });
    if (!user || !user.authInfo || !user.authInfo.localAuth) throw new ResponseError(400, 'Account not registered');
    if (!user.authInfo.confirmed) throw new ResponseError(400, 'Please verify your email first');

    const isMatch = comparePassword(data.password, user.authInfo.localAuth?.password!);
    if (!isMatch) throw new ResponseError(400, 'Wrong password');

    const { accessToken, refreshToken } = generateTokens({ userId: user.id, email: user.email, role: user.role });

    await this.addRefreshToken({ refreshToken, userId: user.id });

    return { accessToken, refreshToken };
  }

  static async logout(user: IParsedToken, token: string): Promise<void> {
    await prisma.user.update({
      where: { id: user.userId },
      data: {
        authInfo: { update: { data: { refreshToken: { deleteMany: { hashedToken: { equals: hashToken(token) } } } } } },
      },
    });

    return;
  }

  static async refreshNewToken(token: string): Promise<{ accessToken: string }> {
    const { userId } = verifyRefreshToken(token);

    const user = await prisma.user.findUnique({ where: { id: userId }, include: { authInfo: true } });
    if (!user) throw new ResponseError(400, 'User not found');
    const existedToken = await prisma.authInfo.findUnique({
      where: { userId },
      include: { refreshToken: { where: { hashedToken: { equals: hashToken(token) }, revoked: false } } },
    });

    if (!existedToken) throw new ResponseError(400, 'Token is invalid or expired');
    if (existedToken.refreshToken.length === 0) throw new ResponseError(400, 'Token is invalid or expired');

    const { accessToken } = generateTokens({ userId, email: user.email, role: user.role });
    return { accessToken };
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
}
