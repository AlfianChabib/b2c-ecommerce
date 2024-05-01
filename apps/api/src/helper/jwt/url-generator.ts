import jwt from 'jsonwebtoken';

interface VerifyTokenData {
  email: string;
  userId: number;
  expiry: Date;
}

export const generateVerifycationToken = (data: VerifyTokenData): string => {
  return jwt.sign(data, process.env.JWT_VERIFIVATION_SECRET, {
    expiresIn: String(process.env.JWT_VERIFIVATION_LIFETIME),
    algorithm: 'HS256',
  });
};

export const verifyToken = (token: string): VerifyTokenData => {
  return jwt.verify(token, process.env.JWT_VERIFIVATION_SECRET, {
    algorithms: ['HS256'],
  }) as VerifyTokenData;
};

export const verificationUrl = (token: string): string => {
  return `${process.env.BASE_FRONTEND_URL}/verify-email?token=${token}`;
};
