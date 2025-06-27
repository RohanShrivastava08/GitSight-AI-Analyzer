'use server';

/**
 * @fileOverview This file contains the Genkit flow for generating personalized tips based on a GitHub profile analysis.
 *
 * - generatePersonalizedTips - A function that generates personalized tips based on the GitHub profile analysis.
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
  prompt: `You are an AI assistant designed to provide personalized tips to GitHub users based on their profile analysis and their specified goals.

  Analyze the provided GitHub profile analysis and user goals, and generate a list of actionable tips to help the user improve their profile and contributions.

  Profile Analysis: {{{profileAnalysis}}}
  User Goals: {{{userGoals}}}

  Format the tips as a bulleted list.  Each tip should be concise and actionable.
  Do not assume anything beyond what is given in the profile analysis.
  Focus on providing practical advice based on the user's goals.
  Be direct and avoid fluff.
  Ensure that each tip is tailored to the user's unique situation and goals.
  Don't say 'Based on your profile analysis and user goals...' just give the tips.

  Tips:
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
