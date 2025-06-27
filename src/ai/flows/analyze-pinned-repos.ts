'use server';

/**
 * @fileOverview This file contains the Genkit flow for analyzing a user's pinned GitHub repositories.
 *
 * - analyzePinnedRepos - A function that generates a review and suggestions for each pinned repository.
 * - AnalyzePinnedReposInput - The input type for the analyzePinnedRepos function.
 * - AnalyzePinnedReposOutput - The return type for the analyzePinnedRepos function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PinnedRepoSchema = z.object({
    name: z.string().describe("The name of the repository."),
    description: z.string().nullable().describe("The description of the repository."),
});
export type AnalyzePinnedReposInput = z.infer<typeof PinnedRepoSchema>[];

const RepoAnalysisSchema = z.object({
  repoName: z.string().describe("The name of the repository being analyzed."),
  review: z.string().describe("A concise, one-sentence review of the repository based on its name and description."),
  suggestions: z.array(z.string()).describe("A list of 2-3 actionable suggestions for improving the repository's presentation (e.g., better description, adding keywords)."),
});

const AnalyzePinnedReposOutputSchema = z.array(RepoAnalysisSchema);
export type AnalyzePinnedReposOutput = z.infer<typeof AnalyzePinnedReposOutputSchema>;


export async function analyzePinnedRepos(
  input: AnalyzePinnedReposInput
): Promise<AnalyzePinnedReposOutput> {
  return analyzePinnedReposFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzePinnedReposPrompt',
  input: {schema: z.object({ repos: z.array(PinnedRepoSchema) }) },
  output: {schema: AnalyzePinnedReposOutputSchema},
  prompt: `You are a senior software developer acting as a mentor. Your task is to review a list of pinned GitHub repositories.

  For each repository provided, analyze its name and description to provide a concise review and actionable suggestions.

  **Instructions:**
  1.  For each repository in the list, generate one concise, high-level review sentence. This should capture the essence of the project.
  2.  For each repository, provide 2-3 actionable suggestions focused on improving its public presentation. Examples: "Clarify the purpose in the description," "Add relevant keywords for better discovery," or "Consider adding a live demo link if applicable."
  3.  Focus solely on the provided name and description. Do not invent features or assume implementation details.

  Your response must be structured as a JSON array, conforming to the output schema.

  Here are the repositories to analyze:
  {{#each repos}}
  - Name: {{{name}}}
    Description: {{{description}}}
  {{/each}}
  `,
});

const analyzePinnedReposFlow = ai.defineFlow(
  {
    name: 'analyzePinnedReposFlow',
    inputSchema: z.array(PinnedRepoSchema),
    outputSchema: AnalyzePinnedReposOutputSchema,
  },
  async (repos) => {
    const {output} = await prompt({ repos });
    return output!;
  }
);
