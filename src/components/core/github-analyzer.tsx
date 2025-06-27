"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Zap, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateProfileInsights } from "@/ai/flows/generate-profile-insights";
import { generatePersonalizedTips } from "@/ai/flows/generate-personalized-tips";
import type { AnalysisResult, Repo } from "@/types";
import { Dashboard } from "./dashboard";
import { Skeleton } from "../ui/skeleton";

const mockCommitHistory = `Commits in last 6 months: 350. Active on weekdays, less on weekends. Peak activity in the afternoon.`;
const mockContributionDetails = `Contributed to 5 public repositories. Opened 20 issues and 15 pull requests. Most contributions are in TypeScript and Python projects.`;

const processLanguageData = (repos: Repo[]) => {
    const langCount = repos.reduce((acc, repo) => {
        if (repo.language) {
            acc[repo.language] = (acc[repo.language] || 0) + 1;
        }
        return acc;
    }, {} as Record<string, number>);

    return Object.entries(langCount)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);
};

const generateCommitActivity = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    return months.map(month => ({
        name: month,
        total: Math.floor(Math.random() * 100) + 10,
    }));
};

export function GithubAnalyzer() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async (userToAnalyze: string) => {
    if (!userToAnalyze) {
      toast({
        title: "Username required",
        description: "Please enter a GitHub username to analyze.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setAnalysisResult(null);

    try {
      const userRes = await fetch(`https://api.github.com/users/${userToAnalyze}`);
      const repoRes = await fetch(`https://api.github.com/users/${userToAnalyze}/repos?sort=updated&per_page=100`);

      if (userRes.status === 404) {
        toast({
            title: "User not found",
            description: `Could not find a GitHub user with the username "${userToAnalyze}".`,
            variant: "destructive",
        });
        setLoading(false);
        return;
      }

      if (!userRes.ok || !repoRes.ok) {
        throw new Error('Failed to fetch data from GitHub.');
      }

      const user = await userRes.json();
      const repos: Repo[] = await repoRes.json();


      // Call Genkit AI flows
      const insightsResult = await generateProfileInsights({
        username: user.login,
        commitHistory: mockCommitHistory,
        contributionDetails: mockContributionDetails,
      });

      const tipsResult = await generatePersonalizedTips({
        profileAnalysis: insightsResult.insights,
        userGoals: "Improve open source presence and collaboration skills.",
      });

      setAnalysisResult({
        user,
        repos,
        insights: insightsResult.insights,
        tips: tipsResult.tips,
        languageData: processLanguageData(repos),
        commitActivity: generateCommitActivity(),
      });
      setUsername("");

    } catch (error) {
      console.error("Analysis failed:", error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="analyzer" className="container mx-auto max-w-3xl py-12 px-4 text-center">
      <div className="mb-8">
        <Zap className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-4xl font-bold tracking-tight font-headline sm:text-5xl">
          GitHub Profile Analyzer
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Enter a GitHub username to get a deep, AI-powered analysis of their profile and contributions.
        </p>
      </div>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>Analyze a Profile</CardTitle>
          <CardDescription>No login required. Just enter a username and see the magic.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAnalyze(username);
            }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Input
              type="text"
              placeholder="e.g., torvalds"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              className="flex-grow text-lg h-12"
            />
            <Button type="submit" disabled={loading} size="lg" className="h-12">
              {loading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Search className="mr-2 h-5 w-5" />
              )}
              Analyze
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {loading && (
        <div className="mt-8">
            <div className="space-y-4">
                <Skeleton className="h-48 w-full" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <Skeleton className="h-64 w-full" />
                    <Skeleton className="h-64 w-full" />
                </div>
                <Skeleton className="h-32 w-full" />
            </div>
        </div>
      )}
      
      {analysisResult && !loading && <Dashboard result={analysisResult} />}
    </section>
  );
}
