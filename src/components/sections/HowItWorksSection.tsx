import type { FC } from 'react';
import { ListChecks, ScanSearch, BarChart3, Coins } from 'lucide-react';
import HowItWorksCard from '@/components/HowItWorksCard';

const steps = [
  {
    icon: <ListChecks size={36} />,
    title: 'Enter Specs',
    description: 'Provide details about the laptop: company, type, OS, screen resolution, and other key features.',
    step: 1,
  },
  {
    icon: <ScanSearch size={36} />,
    title: 'AI Validation',
    description: 'Our intelligent system validates the entered specifications for consistency and accuracy.',
    step: 2,
  },
  {
    icon: <BarChart3 size={36} />,
    title: 'Get Estimate',
    description: 'Receive an estimated price for the laptop based on our advanced prediction model.',
    step: 3,
  },
  {
    icon: <Coins size={36} />,
    title: 'Gain Insights',
    description: 'Explore additional insights and FAQs to understand laptop market trends better.',
    step: 4,
  },
];

const HowItWorksSection: FC = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 animate-fadeInUp">
            How <span className="text-primary">LaptopWise</span> Works
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-foreground/80 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            A simple process to get your laptop price estimation.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <HowItWorksCard
              key={step.title}
              icon={step.icon}
              title={step.title}
              description={step.description}
              step={step.step}
              animationDelay={`${index * 0.2 + 0.4}s`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
