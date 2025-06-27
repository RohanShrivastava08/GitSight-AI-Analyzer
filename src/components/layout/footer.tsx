import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-transparent mt-12">
      <div className="container mx-auto max-w-7xl px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
            <Github className="h-6 w-6 text-muted-foreground" />
            <span className="font-semibold text-muted-foreground">GitSight</span>
        </div>
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} GitSight. AI-Powered GitHub Analysis.</p>
        <div className="flex items-center gap-4">
            <a href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">Features</a>
            <a href="#faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</a>
        </div>
      </div>
    </footer>
  );
}
