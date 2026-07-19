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
          // Sort releases by version descending or buildNumber if present
          const sorted = [...h].sort((a, b) => {
            const aNum = a.buildNumber || 0;
            const bNum = b.buildNumber || 0;
            if (aNum && bNum) return bNum - aNum;
            return b.version.localeCompare(a.version, undefined, { numeric: true });
          });
          setHistory(sorted);
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
      <section className="mx-auto max-w-4xl px-4 py-16 md:px-8">
        <div className="mb-10 text-center">
          <div className="mx-auto h-6 w-24 animate-pulse rounded-full bg-accent" />
          <div className="mx-auto mt-4 h-10 w-64 animate-pulse rounded-lg bg-muted" />
        </div>
        <div className="relative">
          <div className="absolute bottom-0 right-3 top-0 w-px bg-border" />
          <div className="space-y-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="relative pr-10">
                <div className="absolute right-0 top-1 h-7 w-7 animate-pulse rounded-full bg-muted" />
                <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <div className="h-6 w-1/4 animate-pulse rounded bg-muted" />
                  <div className="mt-4 space-y-2">
                    <div className="h-4 w-full animate-pulse rounded bg-muted" />
                    <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
                    <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
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
        <span className="rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground font-medium">
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

                <div className="mt-4 space-y-4">
                  {r.releaseNotesSummary && (
                    <p className="text-sm font-semibold text-foreground/90 leading-6">
                      {r.releaseNotesSummary}
                    </p>
                  )}

                  {Array.isArray(r.releaseNotes) ? (
                    <ul className="space-y-2 text-sm text-muted-foreground leading-7">
                      {r.releaseNotes.map((note, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="space-y-4">
                      {r.releaseNotes?.additions && r.releaseNotes.additions.length > 0 && (
                        <div>
                          <span className="inline-block rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 mb-2">
                            ميزات جديدة
                          </span>
                          <ul className="space-y-2 text-sm text-muted-foreground leading-7 pr-2">
                            {r.releaseNotes.additions.map((note, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                                <span>{note}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {r.releaseNotes?.improvements && r.releaseNotes.improvements.length > 0 && (
                        <div>
                          <span className="inline-block rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[10px] font-bold text-blue-600 mb-2">
                            تحسينات
                          </span>
                          <ul className="space-y-2 text-sm text-muted-foreground leading-7 pr-2">
                            {r.releaseNotes.improvements.map((note, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                                <span>{note}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {r.releaseNotes?.fixes && r.releaseNotes.fixes.length > 0 && (
                        <div>
                          <span className="inline-block rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold text-amber-600 mb-2">
                            إصلاحات
                          </span>
                          <ul className="space-y-2 text-sm text-muted-foreground leading-7 pr-2">
                            {r.releaseNotes.fixes.map((note, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                                <span>{note}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {r.releaseNotes?.security && r.releaseNotes.security.length > 0 && (
                        <div>
                          <span className="inline-block rounded-full bg-purple-500/10 px-2.5 py-0.5 text-[10px] font-bold text-purple-600 mb-2">
                            ترقيات أمنية
                          </span>
                          <ul className="space-y-2 text-sm text-muted-foreground leading-7 pr-2">
                            {r.releaseNotes.security.map((note, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-500" />
                                <span>{note}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
