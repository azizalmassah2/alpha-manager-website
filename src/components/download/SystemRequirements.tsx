import { MonitorSmartphone, Cpu, MemoryStick, HardDrive, ShieldCheck, Wifi } from "lucide-react";
import { DOWNLOAD_PAGE, SYSTEM_REQS_LIST } from "@/content/ar/download";

const ICONS = [MonitorSmartphone, Cpu, MemoryStick, HardDrive, ShieldCheck, Wifi];

export function SystemRequirements() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <div className="mb-10 text-center">
        <span className="rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground">
          {DOWNLOAD_PAGE.systemReqsTitle}
        </span>
        <h2 className="mt-4 text-3xl font-black md:text-4xl">{DOWNLOAD_PAGE.systemReqsSubtitle}</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {SYSTEM_REQS_LIST.map((r, i) => {
          const Icon = ICONS[i] ?? MonitorSmartphone;
          return (
            <div key={r.label} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="mb-3 inline-grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-xs text-muted-foreground">{r.label}</div>
              <div className="mt-1 text-base font-bold">{r.value}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
