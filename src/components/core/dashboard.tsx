"use client";

import type { AnalysisResult } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ContributionGraph } from "./contribution-graph";
import { Users, Building, MapPin, Link as LinkIcon, CheckCircle, XCircle, TrendingUp, BrainCircuit, GitBranch, ChevronsRight, Lightbulb, BarChart, GitCommit, Code } from "lucide-react";
import { Area, AreaChart, Bar, BarChart as BarChartRecharts, CartesianGrid, XAxis, YAxis } from "recharts";
import type { ChartConfig } from "@/components/ui/chart";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";


const languageChartConfig = {
  value: {
    label: "Repositories",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

const commitChartConfig = {
  total: {
    label: "Commits",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig


export function Dashboard({ result }: { result: AnalysisResult }) {
  return (
    <div className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8 animate-fade-in mt-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="flex flex-col items-center lg:items-start">
            <Avatar className="h-40 w-40 border-4 border-border shadow-lg">
              <AvatarImage src={result.user.avatar_url} alt={result.user.name} />
              <AvatarFallback>{result.user.name ? result.user.name.charAt(0) : result.user.login.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="mt-4 text-center lg:text-left">
              <h1 className="text-xl font-bold font-headline">{result.user.name}</h1>
              <a href={result.user.html_url} target="_blank" rel="noopener noreferrer" className="text-lg text-muted-foreground hover:text-primary">
                @{result.user.login}
              </a>
              <p className="mt-2 text-foreground/80 text-sm">{result.user.bio}</p>
            </div>
            <Button asChild className="mt-4 w-full">
                <a href={result.user.html_url} target="_blank" rel="noopener noreferrer">View on GitHub</a>
            </Button>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span className="font-bold text-foreground">{result.user.followers}</span> followers · <span className="font-bold text-foreground">{result.user.following}</span> following
            </div>
            {result.user.company && <div className="flex items-center gap-2 text-muted-foreground"><Building className="w-4 h-4" /> {result.user.company}</div>}
            {result.user.location && <div className="flex items-center gap-2 text-muted-foreground"><MapPin className="w-4 h-4" /> {result.user.location}</div>}
            {result.user.blog && <div className="flex items-center gap-2 text-muted-foreground"><LinkIcon className="w-4 h-4" /> <a href={result.user.blog} className="hover:text-primary truncate">{result.user.blog}</a></div>}
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          <Card className="shadow-lg bg-card/50 backdrop-blur-xl border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-xl"><BrainCircuit className="text-primary"/> AI-Powered Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {result.insights.map((insight, index) => (
                  <li key={index} className="flex items-start gap-3 text-base text-foreground/90 leading-relaxed">
                     <CheckCircle className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                     <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg bg-card/50 backdrop-blur-xl border-border">
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2 text-xl"><GitBranch className="text-primary"/> Contribution Activity</CardTitle>
                <CardDescription>A summary of contribution activity over the last year.</CardDescription>
            </CardHeader>
            <CardContent>
                <ContributionGraph data={result.contributionData} />
            </CardContent>
          </Card>
          
          <div>
            <h2 className="text-2xl font-bold font-headline mb-4 flex items-center gap-3"><TrendingUp className="text-primary"/> AI Profile Ratings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {result.ratings.map((rating, index) => (
                <Card key={index} className="shadow-md bg-card/50 backdrop-blur-xl border-border/80">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-base font-semibold">{rating.category}</CardTitle>
                    <span className="text-xl font-bold text-primary">{rating.score}/10</span>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-2">
                    <Progress value={rating.score * 10} className="h-2" />
                    <div>
                        <ul className="space-y-1 text-xs text-muted-foreground">
                          {rating.pros.map((pro, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle className="w-3.5 h-3.5 mt-0.5 text-green-500 flex-shrink-0" />
                              <span>{pro}</span>
                            </li>
                          ))}
                           {rating.cons.map((con, i) => (
                            <li key={i} className="flex items-start gap-2">
                               <XCircle className="w-3.5 h-3.5 mt-0.5 text-amber-500 flex-shrink-0" />
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             <Card className="shadow-lg bg-card/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="font-headline flex items-center gap-2 text-xl"><Code className="text-primary"/> Language Distribution</CardTitle>
                  <CardDescription>Top languages used in public repositories.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={languageChartConfig} className="min-h-[250px] w-full">
                      <BarChartRecharts accessibilityLayer data={result.languageData} layout="vertical" margin={{ left: 10 }}>
                        <YAxis
                          dataKey="name"
                          type="category"
                          tickLine={false}
                          tickMargin={10}
                          axisLine={false}
                          className="text-xs"
                          interval={0}
                        />
                        <XAxis dataKey="value" type="number" hide />
                        <CartesianGrid horizontal={false} />
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Bar dataKey="value" fill="var(--color-value)" radius={4} />
                      </BarChartRecharts>
                    </ChartContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg bg-card/50 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2 text-xl"><GitCommit className="text-primary"/> Commit Activity</CardTitle>
                    <CardDescription>Total commits in the last 6 months.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={commitChartConfig} className="min-h-[250px] w-full">
                      <AreaChart
                        accessibilityLayer
                        data={result.commitActivity}
                        margin={{ left: 12, right: 12 }}
                      >
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="name"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                        />
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Area
                          dataKey="total"
                          type="natural"
                          fill="var(--color-total)"
                          fillOpacity={0.4}
                          stroke="var(--color-total)"
                        />
                      </AreaChart>
                  </ChartContainer>
                  </CardContent>
              </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-lg bg-card/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2 text-xl"><Lightbulb className="text-primary"/> Personalized Tips</CardTitle>
                <CardDescription>Actionable advice to improve this profile.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                    {result.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <div className="mt-1 p-1 bg-primary/20 rounded-full flex-shrink-0">
                            <ChevronsRight className="w-3 h-3 text-primary"/>
                        </div>
                        <span className="text-foreground/90 text-sm">{tip}</span>
                    </li>
                    ))}
                </ul>
              </CardContent>
            </Card>
             <Card className="shadow-lg bg-card/50 backdrop-blur-xl">
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2 text-xl"><TrendingUp className="text-primary"/> Contribution Strategies</CardTitle>
                    <CardDescription>General advice for consistency.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {result.contributionStrategies.map((tip, index) => (
                        <li key={index} className="flex items-start gap-3">
                           <div className="mt-1 p-1 bg-primary/20 rounded-full flex-shrink-0">
                                <TrendingUp className="w-3 h-3 text-primary"/>
                            </div>
                            <span className="text-foreground/90 text-sm">{tip}</span>
                        </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
