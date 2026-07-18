import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { getUpdateHistory } from "@/services/update";
import type { ReleaseInfo } from "@/types";
import { RELEASES_PAGE } from "@/content/ar/releases";

export function ReleaseTimeline() {
  const [history, setHistory] = useState<ReleaseInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getUpdateHistory()
      .then((h) => {
        if (active) {
          setHistory(h);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (active) {
          console.error(err);
          setError(RELEASES_PAGE.errorUnavailable);
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-24 text-center md:px-8">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
        <p className="mt-4 text-sm text-muted-foreground">{RELEASES_PAGE.loadingText}</p>
      </div>
    );
  }

  if (error || history.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-24 text-center md:px-8">
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 max-w-md mx-auto">
          <p className="text-sm font-semibold text-destructive">{error || RELEASES_PAGE.errorUnavailable}</p>
        </div>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 md:px-8">
      <div className="mb-10 text-center">
        <span className="rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground">
          {RELEASES_PAGE.eyebrow}
        </span>
        <h2 className="mt-4 text-3xl font-black md:text-4xl">{RELEASES_PAGE.sectionTitle}</h2>
      </div>
      <div className="relative">
        <div className="absolute bottom-0 right-3 top-0 w-px bg-border" />
        <div className="space-y-8">
          {history.map((r, i) => (
            <motion.div
              key={r.version}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative pr-10"
            >
              <div className="absolute right-0 top-1 grid h-7 w-7 place-items-center rounded-full bg-brand text-[10px] font-black text-primary-foreground shadow-elegant">
                {i === 0 ? "★" : i + 1}
              </div>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xl font-black text-gradient">v{r.version}</span>
                    {i === 0 && (
                      <span className="rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-bold text-primary">
                        {RELEASES_PAGE.latestBadge}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{r.releaseDate}</span>
                </div>
                <div className="mt-4">
                  <ul className="space-y-2 text-sm text-muted-foreground leading-7">
                    {r.releaseNotes.map((note, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
