import { authInstance } from '@/lib/axios';
import { LoginSchema } from '@/schema/auth-schema';
import { AxiosError, AxiosResponse } from 'axios';

interface ResponseError {
  errors: string;
  seccess: false;
}

export const loginService = async (payload: LoginSchema) => {
  return authInstance
    .post('/auth/login', payload)
    .then((res) => res.data)
    .then((data) => {
      if (data.success) localStorage.setItem('token', data.accessToken);
    })
    .catch((err: AxiosError<ResponseError>) => {
      throw new Error(err.response?.data?.errors);
    });
};
