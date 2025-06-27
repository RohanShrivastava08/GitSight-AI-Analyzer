export function Footer() {
  return (
    <footer className="bg-transparent">
      <div className="container mx-auto px-6 py-8 flex justify-center items-center">
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Git Insights. All rights reserved.</p>
      </div>
    </footer>
  );
}
