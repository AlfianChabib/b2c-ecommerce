import { NextFunction, Request, Response } from 'express';
import { IParsedToken } from '../../types/jwt';

export const requireUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IParsedToken;
    if (!user) {
      return res.status(403).send('Unauthorized');
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const authorizeSuperAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as IParsedToken;
  if (user.role !== 'SuperAdmin') {
    return res.status(403).json({ success: false, message: 'Unauthorized access' });
  }
  next();
};

export const authorizeAdmin = (req: any, res: any, next: any) => {
  const { role } = req.user as IParsedToken;
  if (role === 'User') {
    return res.status(401).json({ success: false, message: 'Unauthorized access' });
  }
  next();
};
