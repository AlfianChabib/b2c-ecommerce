import { LoginForm } from '@/components/auth/form/LoginForm';
import SocialButton from '@/components/auth/SocialButton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center min-h-screen justify-center">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-medium">Register to your account</h2>
        </CardHeader>
        <CardContent className="flex flex-col space-y-2 items-center">
          <p className="text-sm text-zinc-800">Register with Google</p>
          <SocialButton provider="google" />
          <p className="text-sm text-zinc-800">or</p>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
