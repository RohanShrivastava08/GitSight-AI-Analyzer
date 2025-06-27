"use client";

import type { PinnedRepo, RepoAnalysis } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GitFork, Star, Lightbulb, MessageSquareQuote } from "lucide-react";

export function PinnedRepos({ repos, analysis }: { repos: PinnedRepo[], analysis: RepoAnalysis[] }) {
  
  const analysisMap = new Map(analysis.map(a => [a.repoName, a]));

  return (
    <div>
      <h2 className="text-2xl font-bold font-headline mb-4 flex items-center gap-3"><MessageSquareQuote className="text-primary"/> Pinned Repository Analysis</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {repos.map((repo) => {
          const repoAnalysis = analysisMap.get(repo.name);
          return (
            <Card key={repo.name} className="shadow-lg bg-card/50 backdrop-blur-xl border-border">
              <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="font-headline text-lg mb-1">
                            <a href={repo.url} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-primary">
                            {repo.name}
                            </a>
                        </CardTitle>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            {repo.primaryLanguage && (
                                <div className="flex items-center gap-1.5">
                                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: repo.primaryLanguage.color }} />
                                <span>{repo.primaryLanguage.name}</span>
                                </div>
                            )}
                             <div className="flex items-center gap-1">
                                <Star className="w-3.5 h-3.5" />
                                <span>{repo.stargazers}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <GitFork className="w-3.5 h-3.5" />
                                <span>{repo.forks}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <CardDescription className="pt-3 text-sm">{repo.description}</CardDescription>
              </CardHeader>
              {repoAnalysis && (
                <CardContent>
                    <div>
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2"><MessageSquareQuote className="w-4 h-4 text-primary/80"/> AI Review</h4>
                        <p className="text-sm text-foreground/80 italic border-l-2 border-primary/50 pl-3 py-1">"{repoAnalysis.review}"</p>
                    </div>
                    <div className="mt-4">
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2"><Lightbulb className="w-4 h-4 text-primary/80" /> Suggestions</h4>
                        <ul className="space-y-2">
                        {repoAnalysis.suggestions.map((suggestion, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                                <span className="mt-1 text-primary">&rarr;</span>
                                <span>{suggestion}</span>
                            </li>
                        ))}
                        </ul>
                    </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
