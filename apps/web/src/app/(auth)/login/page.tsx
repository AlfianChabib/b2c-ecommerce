import { LoginForm } from '@/components/auth/form/LoginForm';
import SocialButton from '@/components/auth/SocialButton';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <SocialButton provider="google" />
      <LoginForm />
    </div>
  );
}
