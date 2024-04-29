import { NextFunction, Request, Response } from 'express';

export const requireUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(403).send('Unauthorized');
    }
    next();
  } catch (error) {
    next(error);
  }
};
