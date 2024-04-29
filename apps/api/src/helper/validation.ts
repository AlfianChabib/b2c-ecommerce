import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodType } from 'zod';

export class Validation {
  static validate<T>(schema: ZodType, data: T): T {
    return schema.parse(data);
  }

  static validateBody<T>(schema: ZodObject<any, any>) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = req.body;
        const validatedData = schema.parse(data);
        req.body = validatedData;
        next();
      } catch (error) {
        next(error);
      }
    };
  }
}
