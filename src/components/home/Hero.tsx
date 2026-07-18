import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { Download, Sparkles, CheckCircle2, ArrowLeft } from "lucide-react";
import { HERO } from "@/content/ar/home";
import { AppMockup } from "./AppMockup";
import { getVersion, getReleaseDate } from "@/services/update";

export function Hero() {
  const [version, setVersion] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getVersion()
      .then((v) => {
        if (active) setVersion(v);
      })
      .catch(() => {});
    getReleaseDate()
      .then((d) => {
        if (active) setDate(d);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-hero">
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-float" />
        <div className="absolute -bottom-24 left-10 h-80 w-80 rounded-full bg-primary-glow/25 blur-3xl animate-float" />
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-24 md:grid-cols-2 md:px-8 md:pb-24 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start justify-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-semibold text-primary shadow-soft glass">
            <Sparkles className="h-3.5 w-3.5" /> {HERO.newReleaseLabel} {version ? `v${version}` : "..."} {date ? `— ${date}` : ""}
          </span>
          <h1 className="mt-5 text-4xl font-black leading-[1.15] md:text-6xl">
            {HERO.titlePart1}
            <br />
            <span className="text-gradient">{HERO.titlePart2}</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
            {HERO.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/download"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-primary-foreground shadow-elegant transition-transform hover:scale-[1.02]"
            >
              <Download className="h-4 w-4" />
              {HERO.downloadBtn}
            </Link>
            <Link
              to="/features"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-6 py-3 text-sm font-bold text-foreground backdrop-blur transition-colors hover:bg-accent"
            >
              {HERO.featuresBtn}
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> {HERO.osBadge}</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> {HERO.trialBadge}</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> {HERO.supportBadge}</span>
          </div>
        </motion.div>

        <div className="flex items-center">
          <AppMockup />
        </div>
      </div>
    </section>
  );
}
