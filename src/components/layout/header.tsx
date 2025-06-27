import { ThemeToggle } from "@/components/core/theme-toggle";
import { Github } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container h-16 flex items-center justify-between max-w-7xl mx-auto px-4">
        <a href="/" className="flex items-center gap-3">
          <Github className="h-8 w-8 text-foreground" />
          <span className="font-semibold text-lg font-headline hidden sm:inline-block">Git Insights</span>
        </a>
        <div className="flex items-center gap-2">
            <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
