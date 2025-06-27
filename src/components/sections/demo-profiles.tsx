"use client";

import { Button } from "@/components/ui/button";

type DemoProfilesProps = {
  onAnalyze: (username: string) => void;
  loading: boolean;
};

const demoUsernames = ["torvalds", "gaearon", "sindresorhus", "yyx990803"];

export function DemoProfiles({ onAnalyze, loading }: DemoProfilesProps) {
  return (
    <section id="demo-profiles" className="bg-transparent pb-16 sm:pb-24">
      <div className="container mx-auto max-w-5xl px-4 text-center">
        <h2 className="text-2xl font-bold tracking-tight font-headline sm:text-3xl text-muted-foreground">
          Or check out an analysis for...
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {demoUsernames.map((username) => (
            <Button
              key={username}
              variant="outline"
              size="lg"
              onClick={() => onAnalyze(username)}
              disabled={loading}
              className="bg-card/50 backdrop-blur-sm border-border hover:bg-accent"
            >
              {username}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
