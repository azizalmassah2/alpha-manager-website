import { useState } from "react";
import { motion } from "motion/react";
import { AppMockup } from "./AppMockup";
import { SCREENSHOTS } from "@/content/ar/home";

export function Screenshots() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <div className="mb-10 text-center">
        <span className="rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground">
          {SCREENSHOTS.eyebrow}
        </span>
        <h2 className="mt-4 text-3xl font-black md:text-5xl">{SCREENSHOTS.title}</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {SCREENSHOTS.shots.map((s, i) => (
          <button
            key={s.title}
            onClick={() => setActive(i)}
            className={`group relative aspect-video overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${s.tint} p-4 text-right shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant`}
          >
            <div className="absolute inset-0 grid place-items-center opacity-90 transition-opacity group-hover:opacity-100">
              <div className="pointer-events-none w-[86%]">
                <AppMockup />
              </div>
            </div>
            <div className="relative z-10 inline-block rounded-full bg-background/80 px-3 py-1.5 text-xs font-bold backdrop-blur">
              {s.title}
            </div>
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-black/70 p-4 backdrop-blur"
          onClick={() => setActive(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <AppMockup />
            <div className="mt-3 text-center text-sm text-white/80">
              {SCREENSHOTS.shots[active].title} — {SCREENSHOTS.closeInstruction}
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
