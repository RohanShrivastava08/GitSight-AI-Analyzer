import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { GithubAnalyzer } from "@/components/core/github-analyzer";
import { Features } from "@/components/sections/features";
import { HowItWorks } from "@/components/sections/how-it-works";
import { DemoProfiles } from "@/components/sections/demo-profiles";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <GithubAnalyzer />
        <Features />
        <HowItWorks />
        <DemoProfiles />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
