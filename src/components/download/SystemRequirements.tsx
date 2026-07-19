import { useEffect, useState } from "react";
import { MonitorSmartphone, Cpu, MemoryStick, HardDrive, ShieldCheck, Wifi } from "lucide-react";
import { DOWNLOAD_PAGE, SYSTEM_REQS_LIST } from "@/content/ar/download";
import { fetchRequirements } from "@/services/update";
import type { SystemRequirement } from "@/types";

const ICONS = [MonitorSmartphone, Cpu, MemoryStick, HardDrive, ShieldCheck, Wifi];

export function SystemRequirements() {
  const [reqs, setReqs] = useState<SystemRequirement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchRequirements()
      .then((data) => {
        if (!active) return;
        if (data) {
          const list: SystemRequirement[] = [
            { label: "نظام التشغيل", value: data.supportedWindowsVersions.join(" / ") },
            {
              label: "المعالج",
              value: `${data.minimum.cpu} (يُنصح بـ ${data.recommended.cpu})`,
            },
            {
              label: "الذاكرة (RAM)",
              value: `${data.minimum.ram} (يُنصح بـ ${data.recommended.ram})`,
            },
            {
              label: "مساحة القرص",
              value: `${data.minimum.diskSpace} (يُنصح بـ ${data.recommended.diskSpace})`,
            },
            { label: "المعمارية", value: data.architecture },
            {
              label: "البرمجيات المساعدة",
              value: data.additionalSoftware.join("، ") || "WebView2 Runtime",
            },
          ];
          setReqs(list);
        } else {
          setReqs(SYSTEM_REQS_LIST);
        }
        setLoading(false);
      })
      .catch((err) => {
        if (!active) return;
        console.error("Failed to fetch requirements metadata:", err);
        setReqs(SYSTEM_REQS_LIST);
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="mb-10 text-center">
          <span className="rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground">
            {DOWNLOAD_PAGE.systemReqsTitle}
          </span>
          <h2 className="mt-4 text-3xl font-black md:text-4xl">{DOWNLOAD_PAGE.systemReqsSubtitle}</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="mb-3 h-11 w-11 animate-pulse rounded-xl bg-muted" />
              <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
              <div className="mt-2 h-6 w-3/4 animate-pulse rounded bg-muted" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <div className="mb-10 text-center">
        <span className="rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground font-medium">
          {DOWNLOAD_PAGE.systemReqsTitle}
        </span>
        <h2 className="mt-4 text-3xl font-black md:text-4xl">{DOWNLOAD_PAGE.systemReqsSubtitle}</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reqs.map((r, i) => {
          const Icon = ICONS[i] ?? MonitorSmartphone;
          return (
            <div key={r.label} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="mb-3 inline-grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-xs text-muted-foreground font-medium">{r.label}</div>
              <div className="mt-1 text-base font-bold">{r.value}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
