import { Response, Request, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ResponseError } from '../helper/response-error';

export const errorMiddleware = async (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      message: 'Validation Error',
      errors: error.issues,
    });
  } else if (error instanceof ResponseError) {
    res.status(error.status).json({
      errors: error.message,
    });
  } else {
    res.status(500).json({
      errors: error.message,
    });
  }
};

export const notFoundMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (req.path.includes('/api/')) {
    res.status(404).json({
      message: 'Not found !',
    });
  } else {
    next();
  }
};
