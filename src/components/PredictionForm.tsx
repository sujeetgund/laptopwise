
'use client';

import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { LAPTOP_COMPANIES, LAPTOP_TYPES, LAPTOP_OS, LAPTOP_GPU_CATEGORIES, LAPTOP_CPU_CATEGORIES } from '@/lib/constants';
import { validateLaptopSpecs, type ValidateLaptopSpecsInput } from '@/ai/flows/validate-laptop-specs';
import { predictLaptopPrice, type PredictLaptopPriceInput } from '@/ai/flows/predict-laptop-price-flow';
import { useToast } from '@/hooks/use-toast';
import { Wand2 } from 'lucide-react';

const formSchema = z.object({
  company: z.string().min(1, { message: "Company is required." }),
  typeName: z.string().min(1, { message: "Type name is required." }),
  os: z.string().min(1, { message: "Operating system is required." }),
  screenResolution: z.string().min(1, { message: "Screen resolution is required." })
    .regex(/^\d{3,4}x\d{3,4}$/, { message: "Invalid format (e.g., 1920x1080)." }),
  ipsPanel: z.boolean().default(false),
  touchscreen: z.boolean().default(false),
  weight: z.coerce.number().min(0.1, { message: "Weight must be positive." }).max(10, { message: "Weight seems too high." }),
  
  inches: z.coerce.number().min(7, "Screen size seems too small.").max(24, "Screen size seems too large."),
  ram: z.coerce.number().min(1, "RAM must be at least 1GB.").max(128, "RAM seems too high (max 128GB)."), 
  cpuCategory: z.string().min(1, "CPU category is required."),
  cpuSpeedGhz: z.coerce.number().min(0.5, "CPU speed seems too low.").max(6, "CPU speed seems too high."),
  gpuCategory: z.string().min(1, "GPU category is required."),
  ssd: z.coerce.number().min(0, "SSD size cannot be negative.").max(8000, "SSD size seems too high (max 8TB)."), 
  hdd: z.coerce.number().min(0, "HDD size cannot be negative.").max(16000, "HDD size seems too high (max 16TB)."), 
  flash: z.coerce.number().min(0, "Flash storage cannot be negative.").max(2000, "Flash storage seems too high (max 2TB)."), 
  hybrid: z.coerce.number().min(0, "Hybrid storage cannot be negative.").max(2000, "Hybrid storage seems too high (max 2TB)."), 
});

type PredictionFormValues = z.infer<typeof formSchema>;

interface PredictionFormProps {
  setPrice: (price: string | null) => void;
  setError: (error: string | null) => void;
  setIsLoading: (loading: boolean) => void;
}

const PredictionForm: FC<PredictionFormProps> = ({ setPrice, setError, setIsLoading }) => {
  const { toast } = useToast();
  const form = useForm<PredictionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: '',
      typeName: '',
      os: '',
      screenResolution: '',
      ipsPanel: false,
      touchscreen: false,
      weight: 1.5,
      inches: 15.6,
      ram: 8,
      cpuCategory: 'Intel Core i5', // This is a valid default from the list
      cpuSpeedGhz: 2.5,
      gpuCategory: LAPTOP_GPU_CATEGORIES.includes('Intel Mid-End') ? 'Intel Mid-End' : '',
      ssd: 256,
      hdd: 0,
      flash: 0,
      hybrid: 0,
    },
  });

  async function onSubmit(data: PredictionFormValues) {
    setIsLoading(true);
    setPrice(null);
    setError(null);

    try {
      const validationInput: ValidateLaptopSpecsInput = { ...data };
      const validationResult = await validateLaptopSpecs(validationInput);

      if (!validationResult.isValid) {
        setError(validationResult.reason || "Invalid specifications provided.");
        toast({
          title: "Validation Error",
          description: validationResult.reason || "Please check your inputs.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const pricePredictionInput: PredictLaptopPriceInput = { ...data }; 
      
      const predictionApiResult = await predictLaptopPrice(pricePredictionInput);
      const predictedPrice = predictionApiResult.predictedPrice.toFixed(2);
      setPrice(predictedPrice);

      let toastDescription = `Estimated laptop price: ₹${predictedPrice}.`;

      toast({
        title: "Prediction Successful!",
        description: toastDescription,
        variant: "default",
        duration: 7000, 
      });

    } catch (e) {
      console.error("Error during prediction:", e);
      const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred.";
      setError(`Failed to get prediction: ${errorMessage}`);
      toast({
        title: "Prediction Failed",
        description: `An error occurred: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl mx-auto p-6 sm:p-8 bg-card/50 backdrop-blur-sm rounded-xl shadow-2xl border border-border/30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-input/50 border-border/50 focus:ring-primary">
                      <SelectValue placeholder="Select company" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {LAPTOP_COMPANIES.map((company) => (
                      <SelectItem key={company} value={company}>{company}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="typeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type Name</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-input/50 border-border/50 focus:ring-primary">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {LAPTOP_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="os"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Operating System</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-input/50 border-border/50 focus:ring-primary">
                      <SelectValue placeholder="Select OS" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {LAPTOP_OS.map((os) => (
                      <SelectItem key={os} value={os}>{os}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="screenResolution"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Screen Resolution</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 1920x1080" {...field} className="bg-input/50 border-border/50 focus:ring-primary" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight (kg)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" placeholder="e.g., 1.5" {...field} className="bg-input/50 border-border/50 focus:ring-primary" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="inches"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Screen Size (Inches)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" placeholder="e.g., 15.6" {...field} className="bg-input/50 border-border/50 focus:ring-primary" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <FormField
            control={form.control}
            name="ram"
            render={({ field }) => (
              <FormItem>
                <FormLabel>RAM (GB)</FormLabel>
                <FormControl>
                  <Input type="number" step="1" placeholder="e.g., 8" {...field} className="bg-input/50 border-border/50 focus:ring-primary" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cpuSpeedGhz"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPU Speed (GHz)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" placeholder="e.g., 2.5" {...field} className="bg-input/50 border-border/50 focus:ring-primary" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
            control={form.control}
            name="cpuCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPU Category</FormLabel>
                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-input/50 border-border/50 focus:ring-primary">
                      <SelectValue placeholder="Select CPU category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {LAPTOP_CPU_CATEGORIES.map((cpu) => (
                      <SelectItem key={cpu} value={cpu}>{cpu}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
            control={form.control}
            name="gpuCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GPU Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-input/50 border-border/50 focus:ring-primary">
                      <SelectValue placeholder="Select GPU category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {LAPTOP_GPU_CATEGORIES.map((gpu) => (
                      <SelectItem key={gpu} value={gpu}>{gpu}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        
        <p className="text-sm font-medium text-foreground/90 pt-2">Storage (GB):</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FormField
            control={form.control}
            name="ssd"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SSD</FormLabel>
                <FormControl>
                  <Input type="number" step="1" placeholder="e.g., 256" {...field} className="bg-input/50 border-border/50 focus:ring-primary" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hdd"
            render={({ field }) => (
              <FormItem>
                <FormLabel>HDD</FormLabel>
                <FormControl>
                  <Input type="number" step="1" placeholder="e.g., 1000" {...field} className="bg-input/50 border-border/50 focus:ring-primary" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="flash"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Flash</FormLabel>
                <FormControl>
                  <Input type="number" step="1" placeholder="e.g., 64" {...field} className="bg-input/50 border-border/50 focus:ring-primary" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hybrid"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hybrid</FormLabel>
                <FormControl>
                  <Input type="number" step="1" placeholder="e.g., 0" {...field} className="bg-input/50 border-border/50 focus:ring-primary" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 items-center pt-4">
          <FormField
            control={form.control}
            name="ipsPanel"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border/50 p-4 bg-input/30">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">IPS Panel</FormLabel>
                  <FormDescription>Does the laptop have an IPS display?</FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="touchscreen"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border/50 p-4 bg-input/30">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Touchscreen</FormLabel>
                  <FormDescription>Is the display a touchscreen?</FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transform transition-transform hover:scale-105" disabled={form.formState.isSubmitting}>
          <Wand2 className="mr-2 h-5 w-5" />
          {form.formState.isSubmitting ? 'Predicting...' : 'Predict Price'}
        </Button>
      </form>
    </Form>
  );
};

export default PredictionForm;
