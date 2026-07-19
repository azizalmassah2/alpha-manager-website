import { motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  Router,
  Radio,
  Users,
  BarChart3,
  Search,
  Bell,
  Settings,
  LayoutDashboard,
  CreditCard,
  KeyRound,
  DatabaseBackup,
  Activity,
} from "lucide-react";
import { MOCKUP } from "@/content/ar/home";
import { APP_NAME } from "@/constants";
import { getVersion } from "@/services/update";

const SIDEBAR_ICONS = [
  LayoutDashboard,
  Router,
  Radio,
  Users,
  CreditCard,
  BarChart3,
  KeyRound,
  DatabaseBackup,
];

export function AppMockup() {
  const [version, setVersion] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getVersion()
      .then((v) => {
        if (active) setVersion(v);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative"
    >
      <div className="absolute -inset-8 -z-10 bg-brand opacity-20 blur-3xl" />
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-elegant" dir="rtl">
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-border bg-surface-2 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
          </div>
          <div className="text-xs font-semibold text-muted-foreground">{MOCKUP.titleBar}</div>
          <div className="text-xs text-muted-foreground">{version ? `v${version}` : "..."}</div>
        </div>

        <div className="grid grid-cols-[220px_1fr]">
          {/* Sidebar */}
          <aside className="border-l border-border bg-surface px-3 py-4">
            <div className="mb-4 flex items-center gap-2 px-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10 p-1 border border-primary/10">
                <img src="/logos/logo.png" alt={APP_NAME} className="h-6 w-6 object-contain" />
              </div>
              <div className="text-sm font-bold">{APP_NAME}</div>
            </div>
            <div className="space-y-1">
              {Object.keys(MOCKUP.sidebar).map((key, index) => {
                const label = MOCKUP.sidebar[key as keyof typeof MOCKUP.sidebar];
                const Icon = SIDEBAR_ICONS[index] ?? LayoutDashboard;
                const isActive = index === 0;
                return (
                  <div
                    key={key}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium ${
                      isActive
                        ? "bg-brand text-primary-foreground shadow-soft"
                        : "text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </div>
                );
              })}
            </div>
          </aside>

          {/* Content */}
          <div className="bg-background p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-xs text-muted-foreground">{MOCKUP.welcome}</div>
                <div className="text-base font-bold">{MOCKUP.overview}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground">
                  <Search className="h-3.5 w-3.5" />
                  <span>{MOCKUP.searchPlaceholder}</span>
                </div>
                <div className="grid h-8 w-8 place-items-center rounded-full border border-border bg-card">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="grid h-8 w-8 place-items-center rounded-full border border-border bg-card">
                  <Settings className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {MOCKUP.kpis.map((k) => (
                <div key={k.label} className="rounded-xl border border-border bg-card p-3 shadow-soft">
                  <div className="text-[10px] text-muted-foreground">{k.label}</div>
                  <div className="mt-1 flex items-baseline justify-between">
                    <div className="font-mono text-lg font-black">{k.value}</div>
                    <div className="text-[10px] font-bold text-emerald-600">{k.trend}</div>
                  </div>
                  <div className={`mt-2 h-1.5 rounded-full bg-gradient-to-l ${k.color}`} />
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="col-span-2 rounded-xl border border-border bg-card p-4 shadow-soft">
                <div className="mb-2 flex items-center justify-between">
                  <div className="text-xs font-bold">{MOCKUP.networkTraffic}</div>
                  <Activity className="h-4 w-4 text-primary" />
                </div>
                <svg viewBox="0 0 300 90" className="h-24 w-full" aria-hidden="true">
                  <defs>
                    <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.6 0.19 258)" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="oklch(0.6 0.19 258)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,70 C30,55 50,60 75,40 C100,20 130,45 160,35 C190,25 215,55 245,30 C270,10 290,25 300,20 L300,90 L0,90 Z"
                    fill="url(#g)"
                  />
                  <path
                    d="M0,70 C30,55 50,60 75,40 C100,20 130,45 160,35 C190,25 215,55 245,30 C270,10 290,25 300,20"
                    fill="none"
                    stroke="oklch(0.55 0.19 258)"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="rounded-xl border border-border bg-card p-4 shadow-soft">
                <div className="mb-3 text-xs font-bold">{MOCKUP.activeDevicesTitle}</div>
                <ul className="space-y-2 text-xs">
                  {MOCKUP.devicesList.map((d) => (
                    <li key={d.n} className="flex items-center justify-between">
                      <span className="text-muted-foreground">{d.n}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          d.s === "متصل"
                            ? "bg-emerald-500/15 text-emerald-600"
                            : "bg-amber-500/15 text-amber-600"
                        }`}
                      >
                        {d.s === "متصل" ? MOCKUP.connectedStatus : MOCKUP.warningStatus}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
