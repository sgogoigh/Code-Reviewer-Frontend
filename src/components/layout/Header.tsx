import { BotMessageSquare } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-white/10 sticky top-0 bg-background/95 backdrop-blur-sm z-10">
      <div className="container mx-auto flex h-16 items-center justify-center px-4">
        <BotMessageSquare className="h-8 w-8 text-primary" />
        <h1 className="ml-3 text-3xl font-bold text-foreground">
          Code Reviewer Assistant
        </h1>
      </div>
    </header>
  );
}
