import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Zap, LayoutDashboard, Download, SunMoon, Lightbulb, BarChart } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "AI Profile Analysis",
    description: "Get deep insights into any GitHub profile using Genkit and Gemini.",
  },
  {
    icon: BarChart,
    title: "Live Data Fetching",
    description: "Fetches and displays real-time data directly from GitHub profiles.",
  },
  {
    icon: LayoutDashboard,
    title: "Interactive Dashboard",
    description: "Visualize data with beautiful charts and graphs for better understanding.",
  },
  {
    icon: Download,
    title: "Export Functionality",
    description: "Export your analysis report in PDF, image, or text format.",
  },
  {
    icon: SunMoon,
    title: "Light & Dark Mode",
    description: "Switch between light and dark themes for your viewing comfort.",
  },
  {
    icon: Lightbulb,
    title: "AI-Powered Tips",
    description: "Receive personalized tips to improve your GitHub presence.",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-muted/50 py-16 sm:py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight font-headline sm:text-4xl">
            Why You'll Love GitSight
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A comprehensive toolkit to understand and improve any GitHub profile.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-background shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-headline">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
