
import type { FC } from 'react';
import InsightCard from '@/components/InsightCard';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, HelpCircle, DollarSign } from 'lucide-react';

const insights = [
  {
    title: 'Do Apple Laptops Cost More?',
    description: "Generally, Apple laptops command a premium due to their ecosystem, build quality, and brand value. Our data indicates they often have higher resale values as well.",
    imageUrl: '/images/apple-laptops-cost.png',
    imageAlt: 'Comparing Apple laptop prices',
  },
  {
    title: 'Is a Touchscreen Worth It?',
    description: "Touchscreens add versatility, especially for 2-in-1 convertibles. However, they can increase cost and potentially reduce battery life. Consider your use case.",
    imageUrl: '/images/touchscreen-worth.png',
    imageAlt: 'Laptop with touchscreen feature highlighted',
  },
  {
    title: 'Impact of RAM on Price',
    description: "More RAM generally means better multitasking performance and a higher price. 8GB is standard, 16GB is good for most users, while 32GB+ is for demanding tasks.",
    imageUrl: '/images/ram-impact-price.png',
    imageAlt: 'RAM vs Price correlation',
  },
  {
    title: 'SSD vs HDD: Price & Performance',
    description: "SSDs (Solid State Drives) are much faster than HDDs (Hard Disk Drives) and significantly impact performance and price. Most modern laptops feature SSDs.",
    imageUrl: '/images/ssd-vs-hdd.png',
    imageAlt: 'Comparison of SSD and HDD',
  },
];

const faqs = [
  {
    question: "How accurate is the price prediction?",
    answer: "Our AI model is trained on a vast dataset of laptop specifications and market prices. While it provides a strong estimate, actual prices can vary based on condition, seller, and current market demand.",
    icon: <HelpCircle className="h-8 w-8 text-primary" /> // Increased icon size slightly for better visibility when stacked
  },
  {
    question: "What factors most influence laptop price?",
    answer: "Key factors include the CPU, GPU, RAM, storage type and size, screen quality, brand, and build quality. Newer models and premium features also add to the cost.",
    icon: <DollarSign className="h-8 w-8 text-primary" /> // Increased icon size
  },
  {
    question: "Can I use this for any laptop brand?",
    answer: "Yes, our tool supports a wide range of laptop brands and types. If a specific brand or type isn't listed, choose the closest equivalent.",
    icon: <BarChart className="h-8 w-8 text-primary" /> // Increased icon size
  }
];


const InsightsSection: FC = () => {
  return (
    <section id="insights" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 animate-fadeInUp">
            Laptop Market <span className="text-primary">Insights & FAQs</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-foreground/80 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
            Understand more about laptop pricing and common questions.
          </p>
        </div>

        <h3 className="text-2xl font-semibold text-foreground mb-8 text-center animate-fadeInUp" style={{animationDelay: '0.4s'}}>Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {insights.map((insight, index) => (
            <InsightCard
              key={insight.title}
              title={insight.title}
              description={insight.description}
              imageUrl={insight.imageUrl}
              imageAlt={insight.imageAlt}
              animationDelay={`${index * 0.2 + 0.6}s`}
            />
          ))}
        </div>

        <h3 className="text-2xl font-semibold text-foreground mb-8 text-center animate-fadeInUp" style={{animationDelay: '0.8s'}}>Frequently Asked Questions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {faqs.map((faq, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm shadow-lg border-border/30 animate-fadeInUp flex flex-col" style={{ animationDelay: `${index * 0.2 + 1.0}s` }}>
              <CardContent className="p-6 flex flex-col flex-grow">
                <div className="flex flex-col items-center text-center space-y-3 md:flex-row md:items-start md:text-left md:space-x-4 md:space-y-0 flex-grow">
                  <div className="flex-shrink-0 mb-3 md:mt-1 md:mb-0">{faq.icon}</div>
                  <div className="flex flex-col">
                    <h4 className="text-lg font-semibold text-foreground mb-2">{faq.question}</h4>
                    <p className="text-sm text-foreground/80">{faq.answer}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
