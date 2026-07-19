import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_PAGE, FAQ_LIST } from "@/content/ar/faq";
import { fetchFAQ } from "@/services/update";
import type { FAQItem } from "@/types";

export function FAQSection() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchFAQ()
      .then((data) => {
        if (!active) return;
        if (data && data.length > 0) {
          setFaqs([...data].sort((a, b) => a.displayOrder - b.displayOrder));
        } else {
          setFaqs(
            FAQ_LIST.map((f, i) => ({
              question: f.q,
              answer: f.a,
              category: "General",
              displayOrder: i,
            }))
          );
        }
        setLoading(false);
      })
      .catch((err) => {
        if (!active) return;
        console.error("Failed to fetch FAQ metadata:", err);
        setFaqs(
          FAQ_LIST.map((f, i) => ({
            question: f.q,
            answer: f.a,
            category: "General",
            displayOrder: i,
          }))
        );
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-16 md:px-8">
        <div className="mb-10 text-center">
          <div className="mx-auto h-6 w-24 animate-pulse rounded-full bg-accent" />
          <div className="mx-auto mt-4 h-10 w-64 animate-pulse rounded-lg bg-muted" />
        </div>
        <div className="space-y-3 rounded-2xl border border-border bg-card p-4 shadow-soft">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 w-full animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 md:px-8">
      <div className="mb-10 text-center">
        <span className="rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground">
          {FAQ_PAGE.eyebrow}
        </span>
        <h2 className="mt-4 text-3xl font-black md:text-4xl">{FAQ_PAGE.sectionTitle}</h2>
      </div>
      <Accordion
        type="single"
        collapsible
        className="rounded-2xl border border-border bg-card px-4 shadow-soft md:px-6"
      >
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-right text-base font-bold hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
              {f.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-8 text-muted-foreground">
              {f.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
