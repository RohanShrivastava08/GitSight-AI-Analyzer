import { GithubAnalyzer } from "@/components/core/github-analyzer";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <GithubAnalyzer />
      </main>
      <Footer />
    </div>
  );
}
