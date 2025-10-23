'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, AlertTriangle, FileCode, ListChecks, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

type Review = {
  id: string;
  filename: string;
  language: string;
  parsed_report: {
    summary?: string; 
    suggestions: string | string[];
  };
  created_at: string;
};

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch('/api/reviews');
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ detail: 'Failed to fetch reviews' }));
          throw new Error(errorData.detail || `Server responded with status: ${response.status}`);
        }
        const data = await response.json();
        const reviewsArray = Array.isArray(data) ? data : [data];
        const sortedData = reviewsArray.sort((a: Review, b: Review) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        setReviews(sortedData);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  return (
    <main className="flex-grow container mx-auto p-4 md:p-6 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg sm:text-xl font-bold">Previous Reviews</h1>
        <Button asChild variant="outline" size="sm">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>

      {loading && (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      )}

      {error && (
        <Card className="w-full bg-destructive/10 border-destructive">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive-foreground">
              <AlertTriangle />
              Error Loading Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-destructive-foreground/80">{error}</p>
          </CardContent>
        </Card>
      )}

      {!loading && !error && reviews.length === 0 && (
         <Card className="w-full shadow-lg bg-secondary border-white/10">
            <CardContent className="pt-6 text-center">
                <p className="text-sm text-muted-foreground">No previous reviews found.</p>
            </CardContent>
        </Card>
      )}

      {!loading && !error && reviews.length > 0 && (
        <ScrollArea className="h-[calc(100vh-220px)]">
          <div className="space-y-4 pr-4">
            {reviews.map((review) => (
              <Card key={review.id} className="w-full shadow-md bg-secondary border-white/10">
                <CardHeader className="border-b border-white/10 p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <div className="flex-grow">
                            <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                                <CheckCircle className="text-green-500 h-4 w-4" />
                                <span className="text-primary font-semibold">{review.filename}</span>
                            </CardTitle>
                            <CardDescription className="text-xs mt-1">
                                Reviewed on {new Date(review.created_at).toLocaleString()}
                            </CardDescription>
                        </div>
                        <Badge variant="outline" className="text-xs self-start sm:self-center">{review.language}</Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                   <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1" className="border-b-0">
                        <AccordionTrigger className="text-xs p-3 sm:p-4 hover:no-underline">View Details</AccordionTrigger>
                        <AccordionContent className="space-y-4 p-3 sm:p-4 border-t border-white/10 bg-background/30">
                          {review.parsed_report?.summary && (
                            <div>
                              <h4 className="font-semibold mb-2 flex items-center gap-2 text-sm"><FileCode className="text-primary/80 h-4 w-4" /> Summary</h4>
                              <div className="text-xs text-muted-foreground bg-background/50 p-3 rounded-md border border-white/10">
                                <p>{review.parsed_report.summary}</p>
                              </div>
                            </div>
                          )}
                          
                          {review.parsed_report?.suggestions ? (
                            <div>
                               <h4 className="font-semibold mb-2 flex items-center gap-2 text-sm"><ListChecks className="text-primary/80 h-4 w-4" /> Review Details</h4>
                               <div className="bg-background/50 p-3 rounded-md border border-white/10">
                                {typeof review.parsed_report.suggestions === 'string' ? (
                                    <ReactMarkdown 
                                      className="markdown-content"
                                      remarkPlugins={[remarkGfm]}
                                      rehypePlugins={[rehypeRaw]}
                                      components={{
                                        table: ({node, ...props}) => <div className="table-wrapper no-scrollbar"><table {...props} /></div>
                                      }}
                                    >
                                      {review.parsed_report.suggestions}
                                    </ReactMarkdown>
                                ) : (
                                    Array.isArray(review.parsed_report.suggestions) && review.parsed_report.suggestions.length > 0 ? (
                                        <ul className="space-y-2 list-disc list-inside text-xs text-muted-foreground">
                                            {review.parsed_report.suggestions.map((suggestion, index) => (
                                              <li key={index} className="pl-2">{suggestion}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                       <Alert variant="default" className="bg-background/50 border-white/10 text-xs">
                                          <AlertTriangle className="h-4 w-4" />
                                          <AlertTitle>No Suggestions</AlertTitle>
                                          <AlertDescription>The AI review did not provide any suggestions.</AlertDescription>
                                      </Alert>
                                    )
                                )}
                               </div>
                            </div>
                           ) : (
                             <Alert variant="default" className="bg-background/50 border-white/10 text-xs">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>No Details</AlertTitle>
                                <AlertDescription>The AI review did not provide any details.</AlertDescription>
                            </Alert>
                           )}
                        </AccordionContent>
                      </AccordionItem>
                   </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}
    </main>
  );
}
