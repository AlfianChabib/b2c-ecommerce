'use client';

import Image from 'next/image';
import { Button } from '../ui/button';

interface SocialButtonProps {
  provider: string;
}

export default function SocialButton(props: SocialButtonProps) {
  function onClick() {
    window.open(`${process.env.NEXT_PUBLIC_BASE_API_URL}auth/${props.provider}`, '_self');
  }

  return (
    <Button onClick={onClick} size="sm" className="capitalize w-full">
      {/* <span>{image}</span> */}
      <Image src="/icons/google.svg" alt="Google Icon" width={22} height={22} />
      {props.provider}
    </Button>
  );
}
