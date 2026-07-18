import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_PAGE, FAQ_LIST } from "@/content/ar/faq";

export function FAQSection() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 md:px-8">
      <div className="mb-10 text-center">
        <span className="rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground">
          {FAQ_PAGE.eyebrow}
        </span>
        <h2 className="mt-4 text-3xl font-black md:text-4xl">{FAQ_PAGE.sectionTitle}</h2>
      </div>
      <Accordion type="single" collapsible className="rounded-2xl border border-border bg-card px-4 shadow-soft md:px-6">
        {FAQ_LIST.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-right text-base font-bold hover:no-underline">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-8 text-muted-foreground">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
