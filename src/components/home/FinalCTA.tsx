import { Link } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { FINAL_CTA } from "@/content/ar/home";

export function FinalCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-brand p-10 text-center shadow-elegant md:p-16">
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
        <h2 className="relative text-3xl font-black text-primary-foreground md:text-5xl">
          {FINAL_CTA.title}
        </h2>
        <p className="relative mx-auto mt-4 max-w-2xl text-primary-foreground/85">
          {FINAL_CTA.description}
        </p>
        <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/download"
            className="inline-flex items-center gap-2 rounded-full bg-background px-7 py-3.5 text-sm font-bold text-primary shadow-elegant transition-transform hover:scale-[1.02]"
          >
            <Download className="h-4 w-4" />
            {FINAL_CTA.downloadBtn}
          </Link>
          <Link
            to="/support"
            className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-7 py-3.5 text-sm font-bold text-primary-foreground hover:bg-primary-foreground/10"
          >
            {FINAL_CTA.supportBtn}
          </Link>
        </div>
      </div>
    </section>
  );
}
