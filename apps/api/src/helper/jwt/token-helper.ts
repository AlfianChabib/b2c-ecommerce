import * as jwt from 'jsonwebtoken';
import { IAccessToken, IRefreshToken, TokensPaylaod } from '../../types/jwt';
import { Response } from 'express';

export const generateAccessToken = (payload: IAccessToken) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_LIFETIME,
    algorithm: 'HS256',
  });
};

export const generateRefreshToken = (payload: IRefreshToken) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_LIFETIME,
    algorithm: 'HS256',
  });
};

export const generateTokens = (payload: TokensPaylaod) => {
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);
  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET, {
      algorithms: ['HS256'],
    }) as IAccessToken;
  } catch (error) {
    throw error;
  }
};

export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET, {
      algorithms: ['HS256'],
    }) as IRefreshToken;
  } catch (error) {
    throw error;
  }
};

export const sendRefreshToken = async (res: Response, refreshToken: string) => {
  return res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: true,
    path: '/',
  });
};
