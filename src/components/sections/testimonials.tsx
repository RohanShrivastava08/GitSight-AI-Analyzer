import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Rohan Sharma",
    title: "Senior Developer",
    quote: "GitSight gave me a completely new perspective on my contributions. The AI tips were spot-on and genuinely helpful for my career growth.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVvcGxlJTIwZmFjZXxlbnwwfHwwfHx8MA%3D%3D",
    handle: "rohan_s"
  },
  {
    name: "Priya Patel",
    title: "Engineering Manager",
    quote: "I use this tool to understand the strengths of my team members. The dashboard is intuitive and saves me hours of manual profile reviews.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBlb3BsZSUyMGZhY2V8ZW58MHx8MHx8fDA%3D",
    handle: "priya_p"
  },
  {
    name: "Vikram Singh",
    title: "Open Source Contributor",
    quote: "The best no-login GitHub analyzer I've come across. It's fast, beautifully designed, and the export feature is a huge plus for sharing my profile summary.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVvcGxlJTIwZmFjZXxlbnwwfHwwfHx8MA%3D%3D",
    handle: "vikram_s"
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
            See what others are saying about GitSight.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-background shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="pt-6">
                <blockquote className="text-lg text-foreground/90">"{testimonial.quote}"</blockquote>
                <div className="mt-4 flex items-center">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
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
