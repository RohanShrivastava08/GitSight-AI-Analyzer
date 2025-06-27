import { ThemeToggle } from "@/components/core/theme-toggle";
import { Zap } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container h-16 flex items-center justify-between max-w-7xl mx-auto px-4">
        <a href="/" className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl font-headline">Git Insights</span>
        </a>
        <div className="flex items-center gap-2">
            <nav className="hidden md:flex gap-4 text-sm font-medium">
                <a href="#features" className="hover:text-primary transition-colors">Features</a>
                <a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a>
                <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
            </nav>
            <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
