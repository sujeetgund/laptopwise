import type { FC, ReactElement } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface HowItWorksCardProps {
  icon: ReactElement;
  title: string;
  description: string;
  step: number;
  animationDelay?: string;
}

const HowItWorksCard: FC<HowItWorksCardProps> = ({ icon, title, description, step, animationDelay = '0s' }) => {
  return (
    <Card className="bg-card/50 backdrop-blur-sm shadow-xl border-border/30 hover:shadow-primary/20 transition-shadow duration-300 animate-fadeInUp" style={{ animationDelay }}>
      <CardHeader className="items-center text-center">
        <div className="mb-4 p-4 bg-primary/10 rounded-full text-primary">
          {icon}
        </div>
        <CardTitle className="text-2xl font-semibold">
          <span className="text-primary mr-2">{step}.</span>{title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center text-foreground/80 text-base">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default HowItWorksCard;
