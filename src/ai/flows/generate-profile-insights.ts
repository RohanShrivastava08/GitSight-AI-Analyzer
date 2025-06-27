// src/ai/flows/generate-profile-insights.ts
'use server';

/**
 * @fileOverview Generates insights about a GitHub profile based on the user's commit history and contributions.
 *
 * - generateProfileInsights - A function that generates insights about a GitHub profile.
 * - GenerateProfileInsightsInput - The input type for the generateProfileInsights function.
 * - GenerateProfileInsightsOutput - The return type for the generateProfileInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProfileInsightsInputSchema = z.object({
  username: z.string().describe('The GitHub username to analyze.'),
  commitHistory: z.string().describe('The commit history of the user.'),
  contributionDetails: z.string().describe('Details of the contributions of the user.')
});

export type GenerateProfileInsightsInput = z.infer<typeof GenerateProfileInsightsInputSchema>;

const GenerateProfileInsightsOutputSchema = z.object({
  insights: z.string().describe('AI-generated insights about the GitHub profile.'),
});

export type GenerateProfileInsightsOutput = z.infer<typeof GenerateProfileInsightsOutputSchema>;


export async function generateProfileInsights(input: GenerateProfileInsightsInput): Promise<GenerateProfileInsightsOutput> {
  return generateProfileInsightsFlow(input);
}


const findNotablePatterns = ai.defineTool({
  name: 'findNotablePatterns',
  description: 'Finds notable patterns in the user\'s commit history and contributions.',
  inputSchema: z.object({
    commitHistory: z.string().describe('The commit history of the user.'),
    contributionDetails: z.string().describe('Details of the contributions of the user.')
  }),
  outputSchema: z.string(),
},
async (input) => {
  // Placeholder implementation for finding notable patterns.
  // In a real application, this would involve analyzing the commit history and contributions
  // to identify patterns such as frequent contributions to certain projects, consistent coding style, etc.
  return `Identified patterns in commit history and contributions for user: ${input.commitHistory} ${input.contributionDetails}`;
}
);

const profileInsightsPrompt = ai.definePrompt({
  name: 'profileInsightsPrompt',
  tools: [findNotablePatterns],
  input: {schema: GenerateProfileInsightsInputSchema},
  output: {schema: GenerateProfileInsightsOutputSchema},
  prompt: `You are an AI expert in understanding Github profiles.

  Analyze the provided GitHub profile information and generate insights about the user's strengths and areas for improvement.
  Use the findNotablePatterns tool to identify patterns in commit history and contributions, then synthesize these findings into profile insights.
  Use clear and concise language.

  GitHub Username: {{{username}}}
  Commit History: {{{commitHistory}}}
  Contribution Details: {{{contributionDetails}}}

  Insights:`, 
});

const generateProfileInsightsFlow = ai.defineFlow(
  {
    name: 'generateProfileInsightsFlow',
    inputSchema: GenerateProfileInsightsInputSchema,
    outputSchema: GenerateProfileInsightsOutputSchema,
  },
  async input => {
    const {output} = await profileInsightsPrompt(input);
    return output!;
  }
);
