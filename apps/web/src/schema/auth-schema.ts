import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

export const registerEmailSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
});

export const completeRegisterSchema = z.object({
  token: z.string(),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
  username: z.string().min(3, {
    message: 'Username must be at least 3 characters.',
  }),
});

export const forgotPasswordSchema = registerEmailSchema;

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterEmailSchema = z.infer<typeof registerEmailSchema>;
export type CompleteRegisterSchema = z.infer<typeof completeRegisterSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
