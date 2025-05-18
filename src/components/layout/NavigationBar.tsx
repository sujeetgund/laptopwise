'use client';

import type { FC } from 'react';
import { useState, useEffect }
from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useScrollTo } from '@/hooks/useScrollTo';
import { useIsMobile } from '@/hooks/use-mobile'; // Ensure this hook exists

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#prediction', label: 'Prediction' },
  { href: '#insights', label: 'Insights' },
  { href: '#footer', label: 'Contact' },
];

const NavigationBar: FC = () => {
  const { scrollToId } = useScrollTo();
  const isMobile = useIsMobile();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    const navbarElement = document.getElementById('main-navbar');
    if (navbarElement) {
      setNavbarHeight(navbarElement.offsetHeight);
    }
  }, []);


  const handleLinkClick = (id: string, e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const sectionId = id.substring(1); // Remove #
    scrollToId(sectionId, navbarHeight);
    if (isMobile) {
      setIsSheetOpen(false);
    }
  };

  const NavLinkItems = () => (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          onClick={(e) => handleLinkClick(link.href, e)}
          className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
        >
          {link.label}
        </Link>
      ))}
    </>
  );

  return (
    <header id="main-navbar" className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        {isMobile === undefined ? ( // Placeholder for SSR or initial load
          <div className="w-24 h-8 bg-muted rounded animate-pulse"></div>
        ) : isMobile ? (
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background p-6">
              <div className="flex flex-col items-start space-y-6">
                <SheetClose asChild>
                   <Button variant="ghost" size="icon" className="self-end">
                      <X className="h-6 w-6" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                </SheetClose>
                <Logo />
                <nav className="flex flex-col space-y-4 w-full">
                  <NavLinkItems />
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <nav className="flex items-center space-x-6">
            <NavLinkItems />
          </nav>
        )}
      </div>
    </header>
  );
};

export default NavigationBar;
