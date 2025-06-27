"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Zap, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateProfileInsights } from "@/ai/flows/generate-profile-insights";
import { generatePersonalizedTips } from "@/ai/flows/generate-personalized-tips";
import type { AnalysisResult } from "@/types";
import { Dashboard } from "./dashboard";
import { Skeleton } from "../ui/skeleton";

// Mocks for demonstration as we can't fetch live data in this environment.
const mockUser = {
    login: 'demouser',
    avatar_url: 'https://placehold.co/100x100.png',
    html_url: '#',
    name: 'Demo User',
    company: 'Demo Corp',
    blog: '',
    location: 'Internet',
    email: null,
    bio: 'This is a mock GitHub user profile for demonstration purposes. The data is not real but showcases the structure of the analysis.',
    public_repos: 42,
    public_gists: 15,
    followers: 1200,
    following: 35,
    created_at: '2020-01-15T13:45:30Z',
};

const mockRepos = [
    { name: "project-phoenix", language: "TypeScript", stargazers_count: 150 },
    { name: "awesome-ai-list", language: "JavaScript", stargazers_count: 300 },
    { name: "dotfiles", language: "Shell", stargazers_count: 50 },
    { name: "react-component-library", language: "TypeScript", stargazers_count: 200 },
    { name: "portfolio-website", language: "JavaScript", stargazers_count: 75 },
    { name: "data-analysis-notebooks", language: "Python", stargazers_count: 120 },
    { name: "another-project", language: "Python", stargazers_count: 10 },
];

const mockCommitHistory = `Commits in last 6 months: 350. Active on weekdays, less on weekends. Peak activity in the afternoon.`;
const mockContributionDetails = `Contributed to 5 public repositories. Opened 20 issues and 15 pull requests. Most contributions are in TypeScript and Python projects.`;

const processLanguageData = (repos: typeof mockRepos) => {
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
      // In a real app, you would fetch from GitHub API here.
      // We will use mock data for this demonstration.
      const user = { ...mockUser, login: userToAnalyze, name: userToAnalyze.charAt(0).toUpperCase() + userToAnalyze.slice(1) };
      const repos = mockRepos;

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
        description: "Could not analyze the profile. The AI model might be busy. Please try again later.",
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
