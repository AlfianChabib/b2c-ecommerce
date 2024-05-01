'use client';

import { authPage } from '@/constants/path';
import { usePathname } from 'next/navigation';

interface FooterProps {}

export default function Footer(props: FooterProps) {
  const pathname = usePathname();

  if (authPage.includes(pathname)) return null;

  return (
    <footer>
      <h1>Footer</h1>
    </footer>
  );
}
