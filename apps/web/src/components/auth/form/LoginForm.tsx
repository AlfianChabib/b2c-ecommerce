'use client';

import FormInput from '@/components/elements/FormInput';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { LoginSchema, loginSchema } from '@/schema/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export function LoginForm() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: LoginSchema) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput<LoginSchema> control={form.control} placeholder="Email" type="email" name="email" />
        <FormInput<LoginSchema>
          control={form.control}
          placeholder="Password"
          type="password"
          name="password"
          autoComplete="off"
        />
        <Button type="submit">Login</Button>
      </form>
    </Form>
  );
}
