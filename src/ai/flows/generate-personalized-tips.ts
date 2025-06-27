'use server';

/**
 * @fileOverview This file contains the Genkit flow for generating personalized tips and contribution strategies.
 *
 * - generatePersonalizedTips - A function that generates personalized tips and contribution strategies.
 * - GeneratePersonalizedTipsInput - The input type for the generatePersonalizedTips function.
 * - GeneratePersonalizedTipsOutput - The return type for the generatePersonalizedTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedTipsInputSchema = z.object({
  profileAnalysis: z.string().describe('The analysis of the GitHub profile.'),
  userGoals: z.string().describe('The user specified goals for their profile.'),
});
export type GeneratePersonalizedTipsInput = z.infer<
  typeof GeneratePersonalizedTipsInputSchema
>;

const GeneratePersonalizedTipsOutputSchema = z.object({
  tips: z.array(z.string()).describe('A list of personalized tips for the user.'),
  contributionStrategies: z.array(z.string()).describe('A list of general strategies for improving contribution frequency.'),
});
export type GeneratePersonalizedTipsOutput = z.infer<
  typeof GeneratePersonalizedTipsOutputSchema
>;

export async function generatePersonalizedTips(
  input: GeneratePersonalizedTipsInput
): Promise<GeneratePersonalizedTipsOutput> {
  return generatePersonalizedTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedTipsPrompt',
  input: {schema: GeneratePersonalizedTipsInputSchema},
  output: {schema: GeneratePersonalizedTipsOutputSchema},
  prompt: `You are an AI assistant designed to provide personalized tips to GitHub users and general advice on improving contribution habits.

  **Part 1: Personalized Tips**
  Analyze the provided GitHub profile analysis and user goals, and generate a list of actionable tips to help the user improve their profile and contributions.
  - Profile Analysis: {{{profileAnalysis}}}
  - User Goals: {{{userGoals}}}
  - Format the tips as a bulleted list. Each tip should be concise, actionable, and tailored to the user's unique situation.
  - Do not say 'Based on your profile analysis and user goals...' just give the tips.

  **Part 2: Contribution Strategies**
  Provide a separate list of general strategies for maintaining consistent daily, weekly, and yearly contributions to open source. Offer advice that is broadly applicable to any developer.

  Your entire response must conform to the JSON schema.
  `,
});

const generatePersonalizedTipsFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedTipsFlow',
    inputSchema: GeneratePersonalizedTipsInputSchema,
    outputSchema: GeneratePersonalizedTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
