'use client';

import type { FC } from 'react';
import { ChevronUp, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollTo } from '@/hooks/useScrollTo';
import Logo from '@/components/Logo';

const Footer: FC = () => {
  const { scrollToId } = useScrollTo();
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    scrollToId('hero', 0); // Assuming 'hero' is the ID of the top-most section
  };

  return (
    <footer id="footer" className="bg-background border-t border-border/40 py-12 text-foreground/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <Logo className="mb-4" />
            <p className="text-sm">
              Estimate your laptop's worth instantly.
              <br />
              AI-powered price prediction.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollToId('how-it-works', 80); }} className="hover:text-primary transition-colors">How It Works</a></li>
              <li><a href="#prediction" onClick={(e) => { e.preventDefault(); scrollToId('prediction', 80); }} className="hover:text-primary transition-colors">Prediction Tool</a></li>
              <li><a href="#insights" onClick={(e) => { e.preventDefault(); scrollToId('insights', 80); }} className="hover:text-primary transition-colors">Insights</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a href="https://github.com/sujeetgund" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-primary transition-colors">
                <Github size={24} />
              </a>
              <a href="https://linkedin.com/in/sujeetgund" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-primary transition-colors">
                <Linkedin size={24} />
              </a>
               <a href="mailto:sujeetgund@example.com" aria-label="Email" className="hover:text-primary transition-colors">
                <Mail size={24} />
              </a>
            </div>
            <p className="text-sm">Created by Sujeet Gund.</p>
          </div>
        </div>
        <div className="border-t border-border/40 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm">
          <p>&copy; {currentYear} LaptopWise. All rights reserved.</p>
          <Button variant="ghost" size="icon" onClick={handleScrollToTop} aria-label="Scroll to top" className="mt-4 sm:mt-0">
            <ChevronUp size={24} />
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
