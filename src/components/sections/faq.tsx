import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ShieldCheck, DatabaseZap, Cpu } from "lucide-react";

const faqs = [
  {
    question: "Is my data stored when I use Git Insights?",
    answer: "No, we respect your privacy. Git Insights does not store any of your data. All analysis is done in real-time and forgotten once you leave the page.",
    icon: ShieldCheck,
  },
  {
    question: "What kind of data is fetched from GitHub?",
    answer: "We fetch publicly available information from your GitHub profile, such as your bio, follower count, public repositories, and contribution stats. We do not access any private data.",
    icon: DatabaseZap,
  },
  {
    question: "What technology powers the AI analysis?",
    answer: "Our analysis is powered by Google's Gemini model through the Genkit framework. This allows us to provide deep, nuanced insights into your GitHub profile.",
    icon: Cpu,
  },
];

export function Faq() {
  return (
    <section id="faq" className="bg-background py-16 sm:py-24">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight font-headline sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Have questions? We've got answers. If you have other questions, feel free to reach out.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-lg text-left hover:no-underline">
                <div className="flex items-center gap-4">
                    <faq.icon className="h-6 w-6 text-primary flex-shrink-0" />
                    <span>{faq.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground pl-14">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
