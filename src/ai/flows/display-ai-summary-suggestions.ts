'use server';

/**
 * @fileOverview This file defines a Genkit flow for displaying the AI summary and suggestions after code analysis.
 *
 * - displayAiSummaryAndSuggestions - A function that triggers the code analysis and returns the summary and suggestions.
 * - DisplayAiSummaryAndSuggestionsInput - The input type for the displayAiSummaryAndSuggestions function.
 * - DisplayAiSummaryAndSuggestionsOutput - The return type for the displayAiSummaryAndSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DisplayAiSummaryAndSuggestionsInputSchema = z.object({
  filename: z.string().describe('The name of the uploaded file.'),
  language: z.string().describe('The programming language of the file.'),
  code_excerpt: z.string().describe('A snippet of the uploaded source code.'),
  parsed_report: z.object({
    summary: z.string().describe('A summary of the AI analysis.'),
    suggestions: z.array(z.string()).describe('A list of improvement suggestions.'),
  }).describe('The parsed report from the AI code review.'),
  created_at: z.string().describe('The timestamp of when the review was created.'),
});
export type DisplayAiSummaryAndSuggestionsInput = z.infer<typeof DisplayAiSummaryAndSuggestionsInputSchema>;

const DisplayAiSummaryAndSuggestionsOutputSchema = z.object({
  filename: z.string().describe('The name of the uploaded file.'),
  language: z.string().describe('The programming language of the file.'),
  summary: z.string().describe('A summary of the AI analysis.'),
  suggestions: z.array(z.string()).describe('A list of improvement suggestions.'),
});
export type DisplayAiSummaryAndSuggestionsOutput = z.infer<typeof DisplayAiSummaryAndSuggestionsOutputSchema>;

export async function displayAiSummaryAndSuggestions(input: DisplayAiSummaryAndSuggestionsInput): Promise<DisplayAiSummaryAndSuggestionsOutput> {
  return displayAiSummaryAndSuggestionsFlow(input);
}

const displayAiSummaryAndSuggestionsPrompt = ai.definePrompt({
  name: 'displayAiSummaryAndSuggestionsPrompt',
  input: {schema: DisplayAiSummaryAndSuggestionsInputSchema},
  output: {schema: DisplayAiSummaryAndSuggestionsOutputSchema},
  prompt: `Here is the AI code review analysis:

Filename: {{{filename}}}
Language: {{{language}}}
Summary: {{{parsed_report.summary}}}
Suggestions:
{{#each parsed_report.suggestions}}
- {{{this}}}
{{/each}}`,
});

const displayAiSummaryAndSuggestionsFlow = ai.defineFlow(
  {
    name: 'displayAiSummaryAndSuggestionsFlow',
    inputSchema: DisplayAiSummaryAndSuggestionsInputSchema,
    outputSchema: DisplayAiSummaryAndSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await displayAiSummaryAndSuggestionsPrompt(input);
    return output!;
  }
);
