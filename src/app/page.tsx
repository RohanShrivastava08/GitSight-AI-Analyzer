import { GithubAnalyzer } from "@/components/core/github-analyzer";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Features } from "@/components/sections/features";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { DemoAnalysis } from "@/components/sections/demo-analysis";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <GithubAnalyzer />
        <Features />
        <DemoAnalysis />
        <HowItWorks />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
