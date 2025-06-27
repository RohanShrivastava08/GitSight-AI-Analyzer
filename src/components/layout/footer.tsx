import { Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-transparent mt-12">
      <div className="container mx-auto max-w-7xl px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground text-center sm:text-left">AI-Powered Github Analysis by Rohan.</p>
        <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Connect with me here:</span>
            <a href="https://github.com/RohanShrivastava08" target="_blank" rel="noopener noreferrer" aria-label="Rohan's GitHub Profile">
                <Github className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
            </a>
            <a href="https://www.linkedin.com/in/rohan-shrivastava-887a15251/" target="_blank" rel="noopener noreferrer" aria-label="Rohan's LinkedIn Profile">
                <Linkedin className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
            </a>
        </div>
      </div>
    </footer>
  );
}
