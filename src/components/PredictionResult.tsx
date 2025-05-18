'use client';

import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertCircle, CheckCircle2, Loader2, DollarSign } from 'lucide-react';

interface PredictionResultProps {
  price: string | null;
  error: string | null;
  isLoading: boolean;
}

const PredictionResult: FC<PredictionResultProps> = ({ price, error, isLoading }) => {
  if (isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8 animate-fadeInUp bg-card/70 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-center text-2xl font-semibold">
            <Loader2 className="mr-2 h-8 w-8 animate-spin text-primary" />
            Calculating Price...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-foreground/80">Our AI is processing the details. Please wait a moment.</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8 animate-fadeInUp bg-destructive/10 border-destructive text-destructive-foreground shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl font-semibold text-destructive">
            <AlertCircle className="mr-2 h-8 w-8" />
            Validation Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-destructive">{error}</p>
          <p className="text-center text-sm text-destructive/80 mt-2">Please review your inputs and try again.</p>
        </CardContent>
      </Card>
    );
  }

  if (price) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8 animate-fadeInUp bg-card/70 backdrop-blur-sm shadow-xl border-primary/50">
        <CardHeader className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
            <DollarSign className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold text-primary">Estimated Price</CardTitle>
          <CardDescription className="text-foreground/80">Based on the provided specifications.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-5xl font-extrabold text-foreground mb-2">
            ${price}
          </p>
          <p className="text-center text-sm text-foreground/70">
            This is an estimate. Actual market prices may vary.
          </p>
        </CardContent>
      </Card>
    );
  }

  return null; // Nothing to show initially or if no action taken
};

export default PredictionResult;
