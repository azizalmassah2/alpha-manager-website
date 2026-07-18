import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
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
} from "lucide-react";
import { FEATURES_LIST, FEATURES_PAGE } from "@/content/ar/features";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
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
  const list = compact ? FEATURES_LIST.slice(0, 6) : FEATURES_LIST;

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
        {list.map((f, i) => {
          const Icon = ICON_MAP[f.key] ?? Sparkles;
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
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{f.desc}</p>
            </motion.div>
          );
        })}
      </div>
      {compact && (
        <div className="mt-10 text-center">
          <Link
            to="/features"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-bold hover:bg-accent"
          >
            {FEATURES_PAGE.allFeaturesBtn}
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      )}
    </section>
  );
}
