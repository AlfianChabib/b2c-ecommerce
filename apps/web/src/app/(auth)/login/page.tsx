import SocialButton from '@/components/auth/SocialButton';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center">
      <h1>Login Page</h1>
      <SocialButton provider="google" />
    </div>
  );
}
