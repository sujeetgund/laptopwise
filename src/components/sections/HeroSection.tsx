'use client';

import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { useScrollTo } from '@/hooks/useScrollTo';
import { ArrowDownCircle } from 'lucide-react';

const HeroSection: FC = () => {
  const { scrollToId } = useScrollTo();

  const handleCTAClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    scrollToId('prediction', 80); // 80px offset for sticky navbar
  };

  return (
    <section id="hero" className="relative py-20 md:py-32 bg-gradient-to-br from-background to-primary/10 animate-fadeIn">
      <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
          <span className="block xl:inline">Estimate Your Laptop’s</span>{' '}
          <span className="block text-primary xl:inline">Worth Instantly</span>
        </h1>
        <p className="max-w-xl mx-auto text-lg md:text-xl text-foreground/80 mb-10 animate-fadeInUp" style={{animationDelay: '0.4s'}}>
          Leverage our AI-powered tool to get an accurate price estimation for laptops based on their specifications. Quick, easy, and insightful.
        </p>
        <div className="animate-fadeInUp" style={{animationDelay: '0.6s'}}>
          <Button size="lg" onClick={handleCTAClick} className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transform transition-transform hover:scale-105">
            <ArrowDownCircle className="mr-2 h-5 w-5" />
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
