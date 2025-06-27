"use client";

import type { AnalysisResult } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Download, FileText, Image as ImageIcon, Users, GitBranch, Star, Eye, Code, Lightbulb, UserCheck, MessageSquareQuote } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CHART_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

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
    <div className="container mx-auto max-w-6xl p-4 sm:p-6 lg:p-8 space-y-8 animate-fade-in">
      <Card className="overflow-hidden shadow-lg">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-6 bg-muted/30 p-6">
          <Avatar className="h-24 w-24 border-4 border-background shadow-md">
            <AvatarImage src={result.user.avatar_url} alt={result.user.name} />
            <AvatarFallback>{result.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold font-headline">{result.user.name}</h1>
            <a href={result.user.html_url} target="_blank" rel="noopener noreferrer" className="text-lg text-muted-foreground hover:text-primary">
              @{result.user.login}
            </a>
            <p className="mt-2 text-foreground/80 max-w-xl">{result.user.bio}</p>
          </div>
          <div className="flex gap-2 ml-auto">
            <Button onClick={() => handleExport('PDF')} variant="outline" size="icon"><Download className="h-4 w-4" /><span className="sr-only">Download PDF</span></Button>
            <Button onClick={() => handleExport('Image')} variant="outline" size="icon"><ImageIcon className="h-4 w-4" /><span className="sr-only">Download Image</span></Button>
            <Button onClick={() => handleExport('Text')} variant="outline" size="icon"><FileText className="h-4 w-4" /><span className="sr-only">Download Text</span></Button>
          </div>
        </CardHeader>
        <CardContent className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center">
            <div className="flex flex-col items-center justify-center space-y-1">
                <Users className="w-6 h-6 text-primary" />
                <p className="font-bold text-xl">{result.user.followers}</p>
                <p className="text-sm text-muted-foreground">Followers</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-1">
                <UserCheck className="w-6 h-6 text-primary" />
                <p className="font-bold text-xl">{result.user.following}</p>
                <p className="text-sm text-muted-foreground">Following</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-1">
                <GitBranch className="w-6 h-6 text-primary" />
                <p className="font-bold text-xl">{result.user.public_repos}</p>
                <p className="text-sm text-muted-foreground">Repositories</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-1">
                <Code className="w-6 h-6 text-primary" />
                <p className="font-bold text-xl">{result.user.public_gists}</p>
                <p className="text-sm text-muted-foreground">Gists</p>
            </div>
             <div className="flex flex-col items-center justify-center space-y-1 col-span-2 sm:col-span-1">
                <MessageSquareQuote className="w-6 h-6 text-primary" />
                <p className="font-bold text-xl">{new Date(result.user.created_at).toLocaleDateString()}</p>
                <p className="text-sm text-muted-foreground">Joined</p>
            </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Code className="text-primary"/> Languages</CardTitle>
            <CardDescription>Distribution of languages across repositories.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={result.languageData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                    {result.languageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                   <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><GitBranch className="text-primary"/> Commit Activity</CardTitle>
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
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2"><Eye className="text-primary"/> AI-Powered Insights</CardTitle>
          <CardDescription>What the AI thinks about this profile.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/90 whitespace-pre-wrap">{result.insights}</p>
        </CardContent>
      </Card>

      <Card className="shadow-lg bg-gradient-to-br from-primary/5 to-accent/5">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2"><Lightbulb className="text-primary"/> Personalized Tips</CardTitle>
          <CardDescription>Actionable advice to improve this profile.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {result.tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="mt-1.5 p-1 bg-primary/20 rounded-full flex-shrink-0">
                    <Lightbulb className="w-4 h-4 text-primary"/>
                </div>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
