import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { HardHat, ScanSearch, FileDown } from 'lucide-react';

const steps = [
  {
    icon: HardHat,
    title: "1. Enter Username",
    description: "Simply type the GitHub username of the profile you want to analyze. No login or authentication required.",
  },
  {
    icon: ScanSearch,
    title: "2. Get Analysis",
    description: "Our AI fetches live data and generates a detailed report with insights, charts, and personalized tips in seconds.",
  },
  {
    icon: FileDown,
    title: "3. View & Export",
    description: "Explore the interactive dashboard and download the complete analysis in your preferred format (PDF, Image, or Text).",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-background py-16 sm:py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight font-headline sm:text-4xl">
            Get Your Analysis in 3 Simple Steps
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            It's quick, easy, and incredibly powerful.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4">
                <step.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold font-headline mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
