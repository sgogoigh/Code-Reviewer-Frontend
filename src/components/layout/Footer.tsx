import { Button } from '@/components/ui/button';
import { BarChart, History } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t mt-auto border-white/10">
      <div className="container mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
        <Button variant="link" asChild>
            <Link href="/reviews" className="text-muted-foreground">
                <History className="mr-2 h-4 w-4" />
                Previous Reviews
            </Link>
        </Button>
        <Button variant="link" asChild>
          <Link href="/metrics" className="text-muted-foreground">
            <BarChart className="mr-2 h-4 w-4" />
            View Metrics
          </Link>
        </Button>
      </div>
    </footer>
  );
}
