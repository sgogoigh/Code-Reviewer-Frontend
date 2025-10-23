'use server';

/**
 * @fileOverview This file defines a Genkit flow for AI-powered code review.
 *
 * The flow takes source code and its language as input, sends it to a backend API,
 * and returns the AI-generated feedback on code quality, potential bugs, and improvements.
 *
 * - aiCodeReview - The main function to trigger the code review flow.
 * - AiCodeReviewInput - The input type for the aiCodeReview function.
 * - AiCodeReviewOutput - The output type for the aiCodeReview function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiCodeReviewInputSchema = z.object({
  code: z
    .string()
    .describe('The source code to be reviewed.'),
  language: z
    .string()
    .describe('The programming language of the source code.'),
});
export type AiCodeReviewInput = z.infer<typeof AiCodeReviewInputSchema>;

const AiCodeReviewOutputSchema = z.object({
  parsed_report: z.object({
    summary: z.string().describe('A summary of the code review.'),
    suggestions: z.array(z.string()).describe('A list of improvement suggestions.'),
  }).describe('The parsed report from the code review.'),
});
export type AiCodeReviewOutput = z.infer<typeof AiCodeReviewOutputSchema>;

export async function aiCodeReview(input: AiCodeReviewInput): Promise<AiCodeReviewOutput> {
  return aiCodeReviewFlow(input);
}

const aiCodeReviewPrompt = ai.definePrompt({
  name: 'aiCodeReviewPrompt',
  input: {schema: AiCodeReviewInputSchema},
  output: {schema: AiCodeReviewOutputSchema},
  prompt: `You are an AI code reviewer. Review the following code and provide a summary and suggestions for improvement.\n\nLanguage: {{{language}}}\nCode:\n\`\`\`${'{{{language}}}'}
{{{code}}}
\`\`\``,
});

const aiCodeReviewFlow = ai.defineFlow(
  {
    name: 'aiCodeReviewFlow',
    inputSchema: AiCodeReviewInputSchema,
    outputSchema: AiCodeReviewOutputSchema,
  },
  async input => {
    const {output} = await aiCodeReviewPrompt(input);
    return output!;
  }
);
