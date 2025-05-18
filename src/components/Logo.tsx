import type { FC } from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = ({ className = '' }) => {
  return (
    <Link href="/" className={`text-xl md:text-2xl font-bold transition-opacity hover:opacity-80 ${className}`}>
      <span className="text-primary">sujeetgund</span>
      <span className="text-foreground">/laptop-predictor</span>
    </Link>
  );
};

export default Logo;
