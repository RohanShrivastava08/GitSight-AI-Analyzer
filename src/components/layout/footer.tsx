import { Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-xl font-bold font-headline">Git Insights</p>
          <p className="text-sm text-muted-foreground">AI-Powered GitHub Profile Analysis.</p>
        </div>
        <div className="flex flex-col items-center">
            <div className="flex space-x-4 mb-2">
                <Button variant="ghost" size="icon" asChild>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <Github className="h-5 w-5" />
                    </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <Linkedin className="h-5 w-5" />
                    </a>
                </Button>
            </div>
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Git Insights. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
