"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle, Lightbulb, Code, AlertTriangle, FileCode, ListChecks } from 'lucide-react';
import type { AiCodeReviewOutput } from '@/ai/flows/ai-code-review';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

type ReviewResultProps = {
  result: AiCodeReviewOutput & { filename: string; language: string; };
  onClear: () => void;
};

export default function ReviewResult({ result, onClear }: ReviewResultProps) {
  const summary = result?.parsed_report?.summary;
  const suggestions = result?.parsed_report?.suggestions;

  return (
    <Card className="w-full max-w-2xl shadow-2xl bg-secondary border-white/10">
      <CardHeader className="border-b border-white/10">
        <div className="flex items-center justify-between">
            <div>
                <CardTitle className="flex items-center gap-2 text-2xl">
                    <CheckCircle className="text-green-500" />
                    Review Complete
                </CardTitle>
                <CardDescription>AI analysis for <span className="font-semibold text-primary">{result.filename}</span></CardDescription>
            </div>
            {result.language && <Badge variant="outline">{result.language}</Badge>}
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {summary && (
          <div>
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><FileCode className="text-primary" /> Summary</h3>
            <div className="text-muted-foreground bg-background/50 p-4 rounded-md border border-white/10">
              <p>{summary}</p>
            </div>
          </div>
        )}
        
        {suggestions ? (
          <div>
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><ListChecks className="text-primary" /> Review Details</h3>
            <div className="bg-background/50 p-4 rounded-md border border-white/10">
              {typeof suggestions === 'string' ? (
                 <ReactMarkdown 
                    className="markdown-content"
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      table: ({node, ...props}) => <div className="table-wrapper no-scrollbar"><table {...props} /></div>
                    }}
                  >
                    {suggestions}
                </ReactMarkdown>
              ) : (
                 Array.isArray(suggestions) && suggestions.length > 0 ? (
                  <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                    {suggestions.map((suggestion, index) => (
                      <li key={index} className="pl-2">{suggestion}</li>
                    ))}
                  </ul>
                 ) : (
                  <Alert>
                    <Lightbulb className="h-4 w-4" />
                    <AlertTitle>No Suggestions</AlertTitle>
                    <AlertDescription>
                      The AI review did not provide any specific suggestions.
                    </AlertDescription>
                  </Alert>
                 )
              )}
            </div>
          </div>
        ) : (
          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>No Suggestions Provided</AlertTitle>
            <AlertDescription>
              The AI review did not return any specific suggestions for improvement.
            </AlertDescription>
          </Alert>
        )}
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-sm hover:no-underline">
                <div className="flex items-center gap-2">
                    <Code className="text-muted-foreground" />
                    View Raw API Response
                </div>
            </AccordionTrigger>
            <AccordionContent>
              <ScrollArea className="h-48 w-full rounded-md border border-white/10 bg-background/50 p-4 no-scrollbar">
                <pre className="text-xs text-muted-foreground">
                  <code>{JSON.stringify(result, null, 2)}</code>
                </pre>
              </ScrollArea>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter>
        <Button onClick={onClear} className="w-full" variant="outline">
          Review Another File
        </Button>
      </CardFooter>
    </Card>
  );
}
