'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function MetricsPage() {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const response = await fetch('/api/health');
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const data = await response.json();
        setMetrics(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMetrics();
  }, []);

  return (
    <main className="flex-grow container mx-auto flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl bg-secondary border-white/10">
        <CardHeader>
          <CardTitle className="text-2xl">Backend Health Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && (
            <div className="flex items-center justify-center h-48">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>

          )}
          {error && (
            <div className="text-destructive-foreground bg-destructive/80 p-4 rounded-md">
              <p>Error loading metrics: {error}</p>
            </div>
          )}
          {metrics && (
            <div className="space-y-4">
               <pre className="text-xs text-muted-foreground bg-background/50 p-4 rounded-md border border-white/10">
                  <code>{JSON.stringify(metrics, null, 2)}</code>
                </pre>
            </div>
          )}
           <div className="mt-6 text-center">
             <Button asChild variant="outline">
                <Link href="/">Back to Home</Link>
             </Button>
           </div>
        </CardContent>
      </Card>
    </main>
  );
}
