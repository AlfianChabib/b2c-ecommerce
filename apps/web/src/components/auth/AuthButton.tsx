'use client';

import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { usePathname } from 'next/navigation';

export default function AuthButton() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-4">
      <Link href={`/login?callback=${pathname}`} className={buttonVariants({ variant: 'outline', size: 'sm' })}>
        Login
      </Link>
      <Link href={'/register'} className={buttonVariants({ size: 'sm' })}>
        Register
      </Link>
    </div>
  );
}
