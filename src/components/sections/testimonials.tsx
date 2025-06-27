import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Alex Johnson",
    title: "Senior Developer",
    quote: "Git Insights gave me a completely new perspective on my contributions. The AI tips were spot-on and genuinely helpful for my career growth.",
    avatar: "https://placehold.co/40x40.png",
    handle: "alex_j"
  },
  {
    name: "Samantha Lee",
    title: "Engineering Manager",
    quote: "I use this tool to understand the strengths of my team members. The dashboard is intuitive and saves me hours of manual profile reviews.",
    avatar: "https://placehold.co/40x40.png",
    handle: "samantha_l"
  },
  {
    name: "David Chen",
    title: "Open Source Contributor",
    quote: "The best no-login GitHub analyzer I've come across. It's fast, beautifully designed, and the export feature is a huge plus for sharing my profile summary.",
    avatar: "https://placehold.co/40x40.png",
    handle: "david_c"
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-muted/50 py-16 sm:py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight font-headline sm:text-4xl">
            Loved by Developers and Managers
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See what others are saying about Git Insights.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-background shadow-lg">
              <CardContent className="pt-6">
                <blockquote className="text-lg text-foreground/90">"{testimonial.quote}"</blockquote>
                <div className="mt-4 flex items-center">
                  <Avatar>
                    <AvatarImage data-ai-hint="person" src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
