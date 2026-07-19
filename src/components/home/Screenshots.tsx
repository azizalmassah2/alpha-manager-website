import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { AppMockup } from "./AppMockup";
import { SCREENSHOTS } from "@/content/ar/home";
import { fetchScreenshots } from "@/services/update";
import type { ScreenshotItem } from "@/types";

export function Screenshots() {
  const [active, setActive] = useState<number | null>(null);
  const [shots, setShots] = useState<ScreenshotItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let activeSync = true;
    fetchScreenshots()
      .then((data) => {
        if (!activeSync) return;
        if (data && data.length > 0) {
          setShots(data.sort((a, b) => a.displayOrder - b.displayOrder));
        } else {
          setShots(
            SCREENSHOTS.shots.map((s, i) => ({
              title: s.title,
              description: "",
              imageUrl: "",
              category: "General",
              displayOrder: i,
              isFeatured: true,
            }))
          );
        }
        setLoading(false);
      })
      .catch((err) => {
        if (!activeSync) return;
        console.error("Failed to fetch screenshots metadata:", err);
        setShots(
          SCREENSHOTS.shots.map((s, i) => ({
            title: s.title,
            description: "",
            imageUrl: "",
            category: "General",
            displayOrder: i,
            isFeatured: true,
          }))
        );
        setLoading(false);
      });

    return () => {
      activeSync = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="mb-10 text-center">
          <div className="mx-auto h-6 w-24 animate-pulse rounded-full bg-accent" />
          <div className="mx-auto mt-4 h-10 w-64 animate-pulse rounded-lg bg-muted" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="aspect-video animate-pulse rounded-2xl bg-muted" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 font-sans">
      <div className="mb-10 text-center">
        <span className="rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground font-medium">
          {SCREENSHOTS.eyebrow}
        </span>
        <h2 className="mt-4 text-3xl font-black md:text-5xl">{SCREENSHOTS.title}</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {shots.map((s, i) => (
          <button
            key={s.title}
            onClick={() => setActive(i)}
            className="group relative aspect-video overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-brand/5 to-primary/5 p-4 text-right shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          >
            <div className="absolute inset-0 grid place-items-center opacity-90 transition-opacity group-hover:opacity-100">
              <div className="pointer-events-none w-[86%]">
                <AppMockup />
              </div>
            </div>
            <div className="relative z-10 inline-block rounded-full bg-background/90 px-3 py-1.5 text-xs font-bold backdrop-blur">
              {s.title}
            </div>
            {s.description && (
              <div className="absolute inset-x-4 bottom-4 z-10 translate-y-2 rounded-xl bg-background/95 p-3 opacity-0 shadow-soft transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 backdrop-blur text-right">
                <div className="text-xs font-extrabold text-foreground">{s.title}</div>
                <div className="mt-1 text-[11px] leading-5 text-muted-foreground font-medium">{s.description}</div>
              </div>
            )}
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-black/70 p-4 backdrop-blur cursor-zoom-out"
          onClick={() => setActive(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-5xl cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <AppMockup />
            <div className="mt-3 text-center text-sm font-bold text-white/90">
              {shots[active].title} — {SCREENSHOTS.closeInstruction}
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
