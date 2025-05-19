
'use server';
/**
 * @fileOverview Predicts laptop price by calling an external ML model API.
 *
 * - predictLaptopPrice - A function that calls the external API to predict laptop price.
 * - PredictLaptopPriceInput - The input type for the predictLaptopPrice function.
 * - PredictLaptopPriceOutput - The return type for the predictLaptopPrice function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Schema now includes all fields collected from the form.
const PredictLaptopPriceInputSchema = z.object({
  company: z.string().describe('The company of the laptop (e.g., Asus, Acer, Apple).'),
  typeName: z.string().describe('The type of the laptop (e.g., Notebook, Ultrabook).'),
  os: z.string().describe('The operating system of the laptop (e.g., Windows 10, macOS, Linux).'),
  screenResolution: z.string().describe('The screen resolution of the laptop (e.g., 1920x1080).'),
  ipsPanel: z.boolean().describe('Whether the laptop has an IPS panel.'),
  touchscreen: z.boolean().describe('Whether the laptop has a touchscreen.'),
  weight: z.number().describe('The weight of the laptop in kilograms.'),
  inches: z.number().describe('Screen size in inches, e.g., 15.6'),
  ram: z.number().describe('RAM in GB, e.g., 8 or 16'),
  cpuCategory: z.string().describe('CPU Category, e.g., "Intel Core i5"'),
  cpuSpeedGhz: z.number().describe('CPU speed in GHz, e.g., 2.5'),
  gpuCategory: z.string().describe('GPU Category, e.g., "Intel Integrated Graphics" or "Nvidia Mid-End"'),
  ssd: z.number().describe('SSD storage in GB, e.g., 256 or 512'),
  hdd: z.number().describe('HDD storage in GB, e.g., 1000'),
  flash: z.number().describe('Flash storage in GB'),
  hybrid: z.number().describe('Hybrid storage in GB'),
});

export type PredictLaptopPriceInput = z.infer<typeof PredictLaptopPriceInputSchema>;

const PredictLaptopPriceOutputSchema = z.object({
  predictedPrice: z.number().describe('The predicted price of the laptop.'),
  // Warnings removed as all fields are now from the form
});

export type PredictLaptopPriceOutput = z.infer<typeof PredictLaptopPriceOutputSchema>;

const API_URL = 'https://laptop-price-prediction-api-1004676663046.us-central1.run.app/predict';

// Helper function to calculate PPI
function calculatePpi(width: number, height: number, inches: number): number {
  if (inches <= 0) return 0; 
  const diagonalPixels = Math.sqrt(width * width + height * height);
  return parseFloat((diagonalPixels / inches).toFixed(2));
}

// Helper function to derive Resolution Category based on new logic
function deriveResCategory(width: number, height: number): string {
  const totalPixels = width * height;
  if (totalPixels <= 1366 * 768) { 
    return "Low";
  } else if (totalPixels <= 1920 * 1080) { 
    return "Mid";
  } else if (totalPixels <= 2560 * 1600) { 
    return "High";
  } else {
    return "Ultra";
  }
}


export async function predictLaptopPrice(input: PredictLaptopPriceInput): Promise<PredictLaptopPriceOutput> {
  return predictLaptopPriceFlow(input);
}

const predictLaptopPriceFlow = ai.defineFlow(
  {
    name: 'predictLaptopPriceFlow',
    inputSchema: PredictLaptopPriceInputSchema,
    outputSchema: PredictLaptopPriceOutputSchema,
  },
  async (input) => {
    // Parse screen resolution
    const parts = input.screenResolution.split('x');
    const resWidth = parseInt(parts[0], 10);
    const resHeight = parseInt(parts[1], 10);

    // Calculate PPI using inches from form input
    const ppi = calculatePpi(resWidth, resHeight, input.inches);
    const resCategory = deriveResCategory(resWidth, resHeight);

    const apiPayload = {
      Company: input.company,
      TypeName: input.typeName,
      Inches: input.inches,
      Ram: input.ram,
      OpSys: input.os,
      Weight: input.weight,
      HasIpsPanel: input.ipsPanel ? 1 : 0,
      HasTouchScreen: input.touchscreen ? 1 : 0,
      ResWidth: resWidth,
      ResHeight: resHeight,
      ResCategory: resCategory,
      Ppi: ppi,
      Ssd: input.ssd,
      Hdd: input.hdd,
      Flash: input.flash,
      Hybrid: input.hybrid,
      CpuCategory: input.cpuCategory,
      CpuSpeedGhz: input.cpuSpeedGhz,
      GpuCategory: input.gpuCategory,
    };

    try {
      console.log("Sending payload to prediction API:", JSON.stringify(apiPayload, null, 2));
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify(apiPayload),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`API Error ${response.status}: ${errorBody}`);
        throw new Error(`API request failed with status ${response.status}: ${errorBody}`);
      }

      const result = await response.json();
      console.log("Received response from prediction API:", result);

      if (typeof result.predicted_price !== 'number') {
        console.error('Invalid prediction format. Expected "predicted_price" to be a number. Received:', result);
        throw new Error('Invalid prediction format received from API. Expected "predicted_price" field.');
      }
      
      return { predictedPrice: parseFloat(result.predicted_price.toFixed(2)) };

    } catch (error) {
      console.error('Error calling prediction API:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error calling prediction API';
      throw new Error(`Prediction API call failed: ${errorMessage}`);
    }
  }
);
    
