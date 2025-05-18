'use client';

import type { FC } from 'react';
import { useState } from 'react';
import PredictionForm from '@/components/PredictionForm';
import PredictionResult from '@/components/PredictionResult';

const PredictionSection: FC = () => {
  const [predictedPrice, setPredictedPrice] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <section id="prediction" className="py-16 md:py-24 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 animate-fadeInUp">
            Get Your <span className="text-primary">Laptop Estimate</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-foreground/80 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
            Fill in the specifications below to get an AI-powered price prediction.
          </p>
        </div>
        
        <div className="animate-fadeInUp" style={{animationDelay: '0.4s'}}>
          <PredictionForm 
            setPrice={setPredictedPrice} 
            setError={setValidationError}
            setIsLoading={setIsLoading} 
          />
        </div>

        {(predictedPrice || validationError || isLoading) && (
          <div className="mt-12 animate-fadeInUp" style={{animationDelay: '0.6s'}}>
             <PredictionResult 
              price={predictedPrice} 
              error={validationError} 
              isLoading={isLoading}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default PredictionSection;
