'use client';

import FormInput from '@/components/elements/FormInput';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { RegisterEmailSchema, registerEmailSchema } from '@/schema/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export function RegisterForm() {
  const form = useForm<RegisterEmailSchema>({
    resolver: zodResolver(registerEmailSchema),
    defaultValues: { email: '' },
  });

  function onSubmit(values: RegisterEmailSchema) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput<RegisterEmailSchema> control={form.control} placeholder="Email" type="email" name="email" />
        <Button type="submit" disabled={!form.formState.isValid}>
          Login
        </Button>
      </form>
    </Form>
  );
}
