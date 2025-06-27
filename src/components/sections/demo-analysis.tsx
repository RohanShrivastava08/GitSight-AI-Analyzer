import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, TrendingUp, ChevronsRight, XCircle, Users, Lightbulb } from "lucide-react";

export function DemoAnalysis() {
    return (
        <section id="demo" className="bg-muted/50 py-16 sm:py-24">
            <div className="container mx-auto max-w-6xl px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight font-headline sm:text-4xl">
                        See GitSight in Action
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Here's a sample analysis to show you what GitSight can do.
                    </p>
                </div>

                <div className="relative rounded-xl bg-background p-4 sm:p-6 lg:p-8 border border-border shadow-2xl shadow-primary/10 overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
                        {/* Left Sidebar */}
                        <div className="lg:col-span-1 space-y-4 flex flex-col items-center lg:items-start text-center lg:text-left">
                             <Avatar className="h-32 w-32 border-4 border-border shadow-lg">
                                <AvatarImage src="https://avatars.githubusercontent.com/u/94133270?v=4" alt="Rohan Shrivastava" />
                                <AvatarFallback>RS</AvatarFallback>
                            </Avatar>
                            <div>
                                <h1 className="text-xl font-bold font-headline">Rohan Shrivastava</h1>
                                <p className="text-lg text-muted-foreground">@RohanShrivastava08</p>
                            </div>
                            <p className="text-sm text-foreground/80">
                                Front-End Dev 🖥️ | GitHub Enthusiast 🚀 | Open Source Contributor 🏫
                            </p>
                            <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                <Users className="w-4 h-4" />
                                <span className="font-bold text-foreground">18</span> followers · <span className="font-bold text-foreground">6</span> following
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-3 space-y-6">
                             <Card className="shadow-lg bg-card/50 backdrop-blur-xl border-border">
                                <CardHeader>
                                    <CardTitle className="font-headline text-xl">AI-Powered Insights</CardTitle>
                                </CardHeader>
                                <CardContent className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-semibold flex items-center gap-2 mb-3 text-base">
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                        Profile Strengths
                                    </h3>
                                    <ul className="space-y-2">
                                        <li className="flex items-start gap-3 text-sm text-foreground/90">
                                            <ChevronsRight className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                                            <span>Clearly identifies as a Front-End Developer with a focused bio.</span>
                                        </li>
                                        <li className="flex items-start gap-3 text-sm text-foreground/90">
                                            <ChevronsRight className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                                            <span>Active on GitHub with a significant number of public repositories.</span>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-semibold flex items-center gap-2 mb-3 text-base">
                                        <TrendingUp className="w-5 h-5 text-amber-500" />
                                        Areas for Improvement
                                    </h3>
                                    <ul className="space-y-2">
                                        <li className="flex items-start gap-3 text-sm text-foreground/90">
                                             <ChevronsRight className="w-4 h-4 mt-1 text-amber-500 flex-shrink-0" />
                                            <span>Most repositories lack descriptions, making them hard to evaluate.</span>
                                        </li>
                                         <li className="flex items-start gap-3 text-sm text-foreground/90">
                                             <ChevronsRight className="w-4 h-4 mt-1 text-amber-500 flex-shrink-0" />
                                            <span>Build a portfolio website to showcase key projects effectively.</span>
                                        </li>
                                    </ul>
                                </div>
                                </CardContent>
                            </Card>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card className="shadow-md bg-card/50 backdrop-blur-xl border-border/80">
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-base font-semibold">Repository Quality</CardTitle>
                                        <span className="text-xl font-bold text-primary">5/10</span>
                                    </CardHeader>
                                    <CardContent className="space-y-3 pt-2">
                                        <Progress value={50} className="h-2" />
                                        <ul className="space-y-1 text-xs text-muted-foreground">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="w-3.5 h-3.5 mt-0.5 text-green-500 flex-shrink-0" />
                                                <span>Uses modern tech like TypeScript and Next.js.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <XCircle className="w-3.5 h-3.5 mt-0.5 text-amber-500 flex-shrink-0" />
                                                <span>Pinned repositories need descriptions and READMEs.</span>
                                            </li>
                                        </ul>
                                    </CardContent>
                                </Card>
                                <Card className="shadow-lg bg-card/50 backdrop-blur-xl">
                                    <CardHeader>
                                        <CardTitle className="font-headline flex items-center gap-2 text-lg"><Lightbulb className="text-primary"/> AI-Generated Tip</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1 p-1 bg-primary/20 rounded-full flex-shrink-0">
                                                <ChevronsRight className="w-3 h-3 text-primary"/>
                                            </div>
                                            <p className="text-foreground/90 text-sm">Actively contribute to a few well-known open-source projects. This will boost your community engagement score and demonstrate collaboration skills.</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
