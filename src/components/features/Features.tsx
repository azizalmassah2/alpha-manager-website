import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Router,
  Radio,
  LayoutDashboard,
  Users,
  CreditCard,
  BarChart3,
  RefreshCcw,
  KeyRound,
  DatabaseBackup,
  Search,
  Sparkles,
  ShieldCheck,
  ArrowLeft,
  Printer,
} from "lucide-react";
import { FEATURES_LIST, FEATURES_PAGE } from "@/content/ar/features";
import { fetchFeatures } from "@/services/update";
import type { FeatureItem } from "@/types";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  "key-outline": KeyRound,
  "shield-checkmark-outline": ShieldCheck,
  "sync-outline": RefreshCcw,
  "grid-outline": LayoutDashboard,
  "print-outline": Printer,
  "bar-chart-outline": BarChart3,
  // Fallbacks for static content keys
  mikrotik: Router,
  wireless: Radio,
  dashboard: LayoutDashboard,
  users: Users,
  cards: CreditCard,
  reports: BarChart3,
  updates: RefreshCcw,
  licenses: KeyRound,
  backup: DatabaseBackup,
  search: Search,
  ui: Sparkles,
  security: ShieldCheck,
};

export function Features({ compact = false }: { compact?: boolean }) {
  const [features, setFeatures] = useState<FeatureItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchFeatures()
      .then((data) => {
        if (!active) return;
        if (data && data.length > 0) {
          // Filter if compact requested
          const sorted = [...data].sort((a, b) => a.displayOrder - b.displayOrder);
          setFeatures(compact ? sorted.slice(0, 6) : sorted);
        } else {
          // Fallback to local
          const fallback = compact ? FEATURES_LIST.slice(0, 6) : FEATURES_LIST;
          setFeatures(
            fallback.map((f) => ({
              title: f.title,
              description: f.desc,
              category: "General",
              iconName: f.key,
              isKeyFeature: true,
              displayOrder: 1,
            }))
          );
        }
        setLoading(false);
      })
      .catch((err) => {
        if (!active) return;
        console.error("Failed to fetch features metadata, falling back:", err);
        const fallback = compact ? FEATURES_LIST.slice(0, 6) : FEATURES_LIST;
        setFeatures(
          fallback.map((f) => ({
            title: f.title,
            description: f.desc,
            category: "General",
            iconName: f.key,
            isKeyFeature: true,
            displayOrder: 1,
          }))
        );
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [compact]);

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="mb-10 text-center">
          <div className="mx-auto h-6 w-24 animate-pulse rounded-full bg-accent" />
          <div className="mx-auto mt-4 h-10 w-64 animate-pulse rounded-lg bg-muted" />
          <div className="mx-auto mt-3 h-5 w-96 animate-pulse rounded-lg bg-muted" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(compact ? 6 : 9)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="mb-4 h-12 w-12 animate-pulse rounded-xl bg-muted" />
              <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
              <div className="mt-3 h-4 w-full animate-pulse rounded bg-muted" />
              <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-muted" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <div className="mb-10 text-center">
        <span className="rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground">
          {FEATURES_PAGE.eyebrow}
        </span>
        <h2 className="mt-4 text-3xl font-black md:text-5xl">{FEATURES_PAGE.sectionTitle}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          {FEATURES_PAGE.sectionSubtitle}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => {
          const Icon = ICON_MAP[f.iconName] ?? Sparkles;
          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="absolute inset-x-0 top-0 h-0.5 bg-brand opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="mb-4 inline-grid h-12 w-12 place-items-center rounded-xl bg-accent text-primary transition-colors group-hover:bg-brand group-hover:text-primary-foreground">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{f.description}</p>
            </motion.div>
          );
        })}
      </div>
      {compact && (
        <div className="mt-10 text-center">
          <Link
            to="/features"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-bold hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          >
            {FEATURES_PAGE.allFeaturesBtn}
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      )}
    </section>
  );
}
