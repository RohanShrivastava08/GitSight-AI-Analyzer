'use server';

/**
 * @fileOverview Generates insights and ratings for a GitHub profile.
 *
 * - generateProfileInsights - A function that generates insights about a GitHub profile.
 * - GenerateProfileInsightsInput - The input type for the generateProfileInsights function.
 * - GenerateProfileInsightsOutput - The return type for the generateProfileInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProfileInsightsInputSchema = z.object({
  username: z.string().describe('The GitHub username to analyze.'),
  profileSummary: z
    .string()
    .describe(
      'A summary of the user profile including bio, location, company, and other details.'
    ),
  repoSummary: z
    .string()
    .describe(
      "A summary of the user's most popular repositories, including names, descriptions, languages, and star counts."
    ),
});

export type GenerateProfileInsightsInput = z.infer<
  typeof GenerateProfileInsightsInputSchema
>;

const GenerateProfileInsightsOutputSchema = z.object({
  insights: z
    .array(z.string())
    .describe(
      'A list of 3-5 key, actionable insights about the GitHub profile, formatted as individual points.'
    ),
  ratings: z
    .array(
      z.object({
        category: z
          .string()
          .describe(
            'The category of the rating (e.g., Profile Completeness, Repository Quality).'
          ),
        score: z
          .number()
          .min(0)
          .max(10)
          .describe('A score for the category from 0 to 10.'),
        pros: z
          .array(z.string())
          .describe('A list of positive points for this category.'),
        cons: z
          .array(z.string())
          .describe('A list of areas for improvement in this category.'),
      })
    )
    .describe('A list of AI-generated ratings across different categories.'),
});

export type GenerateProfileInsightsOutput = z.infer<
  typeof GenerateProfileInsightsOutputSchema
>;

export async function generateProfileInsights(
  input: GenerateProfileInsightsInput
): Promise<GenerateProfileInsightsOutput> {
  return generateProfileInsightsFlow(input);
}

const profileInsightsPrompt = ai.definePrompt({
  name: 'profileInsightsPrompt',
  input: {schema: GenerateProfileInsightsInputSchema},
  output: {schema: GenerateProfileInsightsOutputSchema},
  prompt: `You are an expert GitHub profile analyzer and career coach.
  Your task is to provide a detailed analysis of a GitHub user's profile, offering both a qualitative summary and quantitative ratings.

  Analyze the provided GitHub profile information:
  - GitHub Username: {{{username}}}
  - Profile Summary: {{{profileSummary}}}
  - Repository Summary: {{{repoSummary}}}

  **Instructions:**
  1.  **Generate Insights:** Based on all the provided information, write a list of 3-5 concise, insightful bullet points summarizing the user's strengths, potential areas for growth, and overall impression. Each point should be a separate string in the array. Focus on their public presence and development habits.
  2.  **Generate Ratings:** Rate the user on a scale of 0 to 10 in the following categories. For each category, provide 1-2 "pros" (things they are doing well) and 1-2 "cons" (areas for improvement).

      *   **Profile Completeness:** How well-filled is their profile? (Name, bio, photo, location, links). A good bio and links are key.
      *   **Repository Quality:** How good are their top repositories? (Do they have READMEs, descriptions, licenses? Are they well-maintained?). A repository without a description is a major negative.
      *   **Community Engagement:** How active are they in the community? (Based on follower count, contributions to other projects if mentioned, etc.).

  Your response must be structured according to the output schema.
  `,
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
