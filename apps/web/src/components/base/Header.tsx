'use client';

import Link from 'next/link';
import AuthButton from '../auth/AuthButton';
import { usePathname } from 'next/navigation';
import { authPage } from '@/constants/path';

interface HeaderProps {}

export default function Header(props: HeaderProps) {
  const pathname = usePathname();

  if (authPage.includes(pathname)) return null;

  return (
    <header className="sticky inset-x-0 top-0 z-50 h-14 w-full border-b border-slate-200 bg-white/60 backdrop-blur-md transition-all">
      <nav className="h-full flex justify-between items-center mx-4">
        <Link href="/" className="text-xl font-medium">
          e_Quip
        </Link>
        <AuthButton />
      </nav>
    </header>
  );
}
