//validate-laptop-specs.ts
'use server';
/**
 * @fileOverview Validates laptop specifications provided by the user.
 *
 * - validateLaptopSpecs - A function that validates the laptop specifications.
 * - ValidateLaptopSpecsInput - The input type for the validateLaptopSpecs function.
 * - ValidateLaptopSpecsOutput - The return type for the validateLaptopSpecs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ValidateLaptopSpecsInputSchema = z.object({
  company: z.string().describe('The company of the laptop (e.g., Asus, Acer, Apple).'),
  typeName: z.string().describe('The type of the laptop (e.g., Notebook, Ultrabook).'),
  os: z.string().describe('The operating system of the laptop (e.g., Windows 10, macOS, Linux).'),
  screenResolution: z.string().describe('The screen resolution of the laptop.'),
  ipsPanel: z.boolean().describe('Whether the laptop has an IPS panel.'),
  touchscreen: z.boolean().describe('Whether the laptop has a touchscreen.'),
  weight: z.number().describe('The weight of the laptop in kilograms.'),
});

export type ValidateLaptopSpecsInput = z.infer<typeof ValidateLaptopSpecsInputSchema>;

const ValidateLaptopSpecsOutputSchema = z.object({
  isValid: z.boolean().describe('Whether the provided laptop specifications are valid.'),
  reason: z.string().optional().describe('The reason why the laptop specifications are invalid, if applicable.'),
});

export type ValidateLaptopSpecsOutput = z.infer<typeof ValidateLaptopSpecsOutputSchema>;

export async function validateLaptopSpecs(input: ValidateLaptopSpecsInput): Promise<ValidateLaptopSpecsOutput> {
  return validateLaptopSpecsFlow(input);
}

const validateLaptopSpecsPrompt = ai.definePrompt({
  name: 'validateLaptopSpecsPrompt',
  input: {schema: ValidateLaptopSpecsInputSchema},
  output: {schema: ValidateLaptopSpecsOutputSchema},
  prompt: `You are an AI expert in laptop specifications. Your task is to validate the provided laptop specifications and determine if they are logical and error-free.

  Here are the laptop specifications:
  - Company: {{{company}}}
  - Type Name: {{{typeName}}}
  - OS: {{{os}}}
  - Screen Resolution: {{{screenResolution}}}
  - IPS Panel: {{{ipsPanel}}}
  - Touchscreen: {{{touchscreen}}}
  - Weight: {{{weight}}} kg

  Determine if the specifications are valid. For example, an Apple laptop cannot run Windows. If the specifications are invalid, provide a reason in the 'reason' field. If valid, set 'isValid' to true and leave 'reason' blank.

  Respond in JSON format.
  `,
});

const validateLaptopSpecsFlow = ai.defineFlow(
  {
    name: 'validateLaptopSpecsFlow',
    inputSchema: ValidateLaptopSpecsInputSchema,
    outputSchema: ValidateLaptopSpecsOutputSchema,
  },
  async input => {
    const {output} = await validateLaptopSpecsPrompt(input);
    return output!;
  }
);
