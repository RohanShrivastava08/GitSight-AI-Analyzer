"use client";

import type { AnalysisResult } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Download, FileText, Image as ImageIcon, Users, GitBranch, Star, Eye, Code, Lightbulb, UserCheck, MessageSquareQuote, CheckCircle, XCircle, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CHART_COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE", "#00C49F"];

export function Dashboard({ result }: { result: AnalysisResult }) {
  const { toast } = useToast();

  const handleExport = (format: 'PDF' | 'Image' | 'Text') => {
    toast({
      title: `Exporting as ${format}`,
      description: `This feature is for demonstration purposes. Full export functionality would be implemented here.`,
    });
    console.log(`Exporting report for ${result.user.login} as ${format}`);
  };

  const chartConfig = {
    views: {
      label: "Views",
    },
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
  }

  return (
    <div className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8 space-y-8 animate-fade-in">
      <Card className="overflow-hidden shadow-2xl bg-card/50 backdrop-blur-xl border-primary/20">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-gradient-to-br from-primary/10 to-transparent">
          <Avatar className="h-28 w-28 border-4 border-background shadow-lg">
            <AvatarImage src={result.user.avatar_url} alt={result.user.name} />
            <AvatarFallback>{result.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <h1 className="text-4xl font-bold font-headline">{result.user.name}</h1>
            <a href={result.user.html_url} target="_blank" rel="noopener noreferrer" className="text-lg text-primary hover:underline">
              @{result.user.login}
            </a>
            <p className="mt-2 text-foreground/80 max-w-2xl">{result.user.bio}</p>
          </div>
          <div className="flex gap-2 ml-auto">
            <Button onClick={() => handleExport('PDF')} variant="outline" size="icon"><Download className="h-4 w-4" /><span className="sr-only">Download PDF</span></Button>
            <Button onClick={() => handleExport('Image')} variant="outline" size="icon"><ImageIcon className="h-4 w-4" /><span className="sr-only">Download Image</span></Button>
            <Button onClick={() => handleExport('Text')} variant="outline" size="icon"><FileText className="h-4 w-4" /><span className="sr-only">Download Text</span></Button>
          </div>
        </CardHeader>
        <CardContent className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center bg-card/20">
            <div className="flex flex-col items-center justify-center space-y-1 p-2 rounded-lg hover:bg-primary/5 transition-colors">
                <Users className="w-7 h-7 text-primary" />
                <p className="font-bold text-2xl">{result.user.followers}</p>
                <p className="text-sm text-muted-foreground">Followers</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-1 p-2 rounded-lg hover:bg-primary/5 transition-colors">
                <UserCheck className="w-7 h-7 text-primary" />
                <p className="font-bold text-2xl">{result.user.following}</p>
                <p className="text-sm text-muted-foreground">Following</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-1 p-2 rounded-lg hover:bg-primary/5 transition-colors">
                <GitBranch className="w-7 h-7 text-primary" />
                <p className="font-bold text-2xl">{result.user.public_repos}</p>
                <p className="text-sm text-muted-foreground">Repositories</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-1 p-2 rounded-lg hover:bg-primary/5 transition-colors">
                <Code className="w-7 h-7 text-primary" />
                <p className="font-bold text-2xl">{result.user.public_gists}</p>
                <p className="text-sm text-muted-foreground">Gists</p>
            </div>
             <div className="flex flex-col items-center justify-center space-y-1 p-2 rounded-lg hover:bg-primary/5 transition-colors col-span-2 sm:col-span-1">
                <MessageSquareQuote className="w-7 h-7 text-primary" />
                <p className="font-bold text-2xl">{new Date(result.user.created_at).toLocaleDateString()}</p>
                <p className="text-sm text-muted-foreground">Joined</p>
            </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 shadow-lg bg-card/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline"><Eye className="text-primary"/> AI-Powered Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-foreground/90 whitespace-pre-wrap leading-relaxed">{result.insights}</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-card/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline"><Code className="text-primary"/> Languages</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={result.languageData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {result.languageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                   <ChartTooltip cursor={true} content={<ChartTooltipContent hideLabel />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-3xl font-bold font-headline mb-6 flex items-center gap-3"><TrendingUp className="text-primary"/> AI-Powered Ratings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {result.ratings.map((rating, index) => (
            <Card key={index} className="shadow-lg bg-card/50 backdrop-blur-xl border-primary/10">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">{rating.category}</CardTitle>
                <span className="text-2xl font-bold text-primary">{rating.score}/10</span>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={rating.score * 10} className="h-2" />
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-2 text-green-500">What's good</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {rating.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-amber-500">Needs improvement</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {rating.cons.map((con, i) => (
                        <li key={i} className="flex items-start gap-2">
                           <XCircle className="w-4 h-4 mt-0.5 text-amber-500 flex-shrink-0" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-lg bg-card/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline"><GitBranch className="text-primary"/> Commit Activity</CardTitle>
            <CardDescription>Mock commit activity over the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent>
             <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={result.commitActivity}>
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
         <Card className="shadow-lg bg-gradient-to-br from-primary/5 via-transparent to-accent/5 backdrop-blur-xl">
            <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2"><Lightbulb className="text-primary"/> Personalized Tips</CardTitle>
            <CardDescription>Actionable advice to improve this profile.</CardDescription>
            </CardHeader>
            <CardContent>
            <ul className="space-y-3">
                {result.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 p-1.5 bg-primary/20 rounded-full flex-shrink-0">
                        <Lightbulb className="w-4 h-4 text-primary"/>
                    </div>
                    <span className="text-foreground/90">{tip}</span>
                </li>
                ))}
            </ul>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
