'use client';

interface SocialButtonProps {
  provider: string;
}

export default function SocialButton(props: SocialButtonProps) {
  function onClick() {
    window.open(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}auth/${props.provider}`,
      '_self',
    );
  }

  return <button onClick={onClick}>Login with {props.provider}</button>;
}
