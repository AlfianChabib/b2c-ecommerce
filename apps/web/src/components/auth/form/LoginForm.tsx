'use client';

import FormInput from '@/components/elements/FormInput';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { LoginSchema, loginSchema } from '@/schema/auth-schema';
import { loginService } from '@/services/auth-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const router = useRouter();
  const searchParams = useSearchParams();
  const loginCallback = searchParams.get('callback');
  const accessToken = searchParams.get('accessToken');

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const loginSuccess = () => {
    router.push(loginCallback || '/');
  };

  useEffect(() => {
    if (accessToken) {
      router.push(loginCallback || '/');
    }
  }, [accessToken, router, loginCallback]);

  function onSubmit(values: LoginSchema) {
    setLoading(true);
    loginService(values)
      .then((res) => {
        loginSuccess();
      })
      .catch((err) => {
        setMessage(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Form {...form}>
      {message && <p className="text-red-500">{message}</p>}
      <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput<LoginSchema> control={form.control} placeholder="Email" type="email" name="email" />
        <FormInput<LoginSchema>
          control={form.control}
          placeholder="Password"
          type="password"
          name="password"
          autoComplete="off"
        />
        <Button type="submit" disabled={!form.formState.isValid || loading}>
          {loading ? 'Loading...' : 'Login'}
        </Button>
      </form>
    </Form>
  );
}
