import { Github, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/95 mt-16 backdrop-blur-sm">
      <div className="container mx-auto max-w-7xl px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground text-center sm:text-left">
            Designed by <a href="https://github.com/RohanShrivastava08" target="_blank" rel="noopener noreferrer" className="font-medium text-foreground hover:text-primary transition-colors">Rohan</a>.
        </p>
        <p className="text-sm text-muted-foreground order-first sm:order-none">
          <span className="font-semibold text-foreground">GitSight</span> &mdash; AI-Powered GitHub Analysis
        </p>
        <div className="flex gap-5">
            <a href="https://github.com/RohanShrivastava08" target="_blank" rel="noopener noreferrer" aria-label="Rohan's GitHub" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://www.linkedin.com/in/rohan-shrivastava-887a15251/" target="_blank" rel="noopener noreferrer" aria-label="Rohan's LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
        </div>
      </div>
    </footer>
  );
}
