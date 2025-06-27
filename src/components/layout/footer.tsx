export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-transparent mt-12">
      <div className="container mx-auto max-w-7xl px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground">Designed by Rohan.</p>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">GitSight</span>. AI-Powered GitHub
          Analysis.
        </p>
      </div>
    </footer>
  );
}
