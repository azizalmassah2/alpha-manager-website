import { useEffect, useState } from "react";
import { Download, ShieldCheck } from "lucide-react";
import { DOWNLOAD_PAGE } from "@/content/ar/download";
import { getLatestUpdate, getUpdateHistory, getFormattedFileSize } from "@/services/update";
import type { UpdateInfo, ReleaseInfo } from "@/types";

export function DownloadSection() {
  const [updateInfo, setUpdateInfo] = useState<UpdateInfo | null>(null);
  const [history, setHistory] = useState<ReleaseInfo[]>([]);
  const [fileSizeStr, setFileSizeStr] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    Promise.all([getLatestUpdate(), getUpdateHistory(), getFormattedFileSize()])
      .then(([latest, hist, sizeStr]) => {
        if (!active) return;
        setUpdateInfo(latest);
        setHistory(hist);
        setFileSizeStr(sizeStr);
        setLoading(false);
      })
      .catch((err) => {
        if (!active) return;
        console.error(err);
        setError(DOWNLOAD_PAGE.errorUnavailable);
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center md:px-8">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
        <p className="mt-4 text-sm text-muted-foreground">{DOWNLOAD_PAGE.loadingText}</p>
      </div>
    );
  }

  if (error || !updateInfo) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center md:px-8">
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 max-w-md mx-auto">
          <p className="text-sm font-semibold text-destructive">{error || DOWNLOAD_PAGE.errorUnavailable}</p>
        </div>
      </div>
    );
  }

  const previousVersions = history.filter((r) => r.version !== updateInfo.version);

  return (
    <section id="download" className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      {/* Dynamic Announcement Banner */}
      {updateInfo.message && (
        <div className="mb-8 rounded-2xl border border-primary/25 bg-primary/5 p-4 text-sm font-semibold text-primary text-center glass shadow-soft">
          {updateInfo.message}
        </div>
      )}

      <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
        {/* Download Box */}
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-elegant md:p-10">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand opacity-20 blur-3xl" />
          <span className="rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground">
            {DOWNLOAD_PAGE.latestReleaseLabel}
          </span>
          <div className="mt-3 flex flex-wrap items-baseline gap-3">
            <h2 className="text-3xl font-black md:text-4xl">Alpha Manager</h2>
            <span className="font-mono text-2xl font-black text-gradient">v{updateInfo.version}</span>
          </div>

          {/* Dynamic Mandatory/Optional tags */}
          <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-2 items-center text-xs">
            <span
              className={`rounded-full px-2.5 py-0.5 font-bold ${
                updateInfo.mandatory
                  ? "bg-red-500/10 text-red-500 border border-red-500/25"
                  : "bg-emerald-500/10 text-emerald-500 border border-emerald-500/25"
              }`}
            >
              {updateInfo.mandatory ? DOWNLOAD_PAGE.mandatoryMessage : DOWNLOAD_PAGE.optionalMessage}
            </span>
            <span className="text-muted-foreground font-medium">
              {DOWNLOAD_PAGE.minSupportedVersionLabel}: v{updateInfo.minimumSupportedVersion}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            <MetaCard label={DOWNLOAD_PAGE.releaseDateLabel} value={updateInfo.releaseDate} />
            <MetaCard label={DOWNLOAD_PAGE.fileSizeLabel} value={fileSizeStr} />
            <MetaCard label={DOWNLOAD_PAGE.osLabel} value="Windows 10 / 11" />
            <MetaCard label={DOWNLOAD_PAGE.archLabel} value={DOWNLOAD_PAGE.archValue} />
          </div>

          <div className="mt-6">
            <div className="text-xs text-muted-foreground">{DOWNLOAD_PAGE.sha256Label}</div>
            <div className="mt-1 overflow-x-auto rounded-lg border border-border bg-surface p-3 font-mono text-[11px] leading-6 text-foreground select-all">
              {updateInfo.sha256}
            </div>
          </div>

          {/* Download Button State based on enabled property */}
          <div className="mt-6 flex flex-col items-start gap-2">
            {updateInfo.enabled ? (
              <a
                href={updateInfo.downloadUrl}
                className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-base font-bold text-primary-foreground shadow-elegant transition-transform hover:scale-[1.02]"
              >
                <Download className="h-5 w-5" />
                {DOWNLOAD_PAGE.downloadBtnText.replace("{version}", updateInfo.version)}
              </a>
            ) : (
              <button
                disabled
                className="inline-flex items-center gap-2 rounded-full bg-muted text-muted-foreground px-7 py-3.5 text-base font-bold cursor-not-allowed shadow-none"
              >
                <Download className="h-5 w-5" />
                {DOWNLOAD_PAGE.downloadBtnText.replace("{version}", updateInfo.version)}
              </button>
            )}
            
            {!updateInfo.enabled && (
              <p className="text-xs font-bold text-destructive">
                {DOWNLOAD_PAGE.downloadDisabledMessage}
              </p>
            )}

            <p className="mt-1 text-xs text-muted-foreground">
              <ShieldCheck className="ml-1 inline h-3.5 w-3.5 text-primary" />
              {DOWNLOAD_PAGE.signedFileTip}
            </p>
          </div>
        </div>

        {/* Release Notes Box */}
        <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
          <h3 className="text-lg font-bold">{DOWNLOAD_PAGE.releaseNotesTitle}</h3>
          <div className="mt-4 space-y-4 text-sm">
            <ul className="space-y-3 text-muted-foreground leading-7">
              {updateInfo.releaseNotes.map((note, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Previous Versions Table */}
      <div className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8">
        <h3 className="mb-4 text-lg font-bold">{DOWNLOAD_PAGE.previousVersionsTitle}</h3>
        {previousVersions.length === 0 ? (
          <p className="text-center py-6 text-sm text-muted-foreground">
            {DOWNLOAD_PAGE.previousVersionsEmpty}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead className="border-b border-border text-xs text-muted-foreground">
                <tr>
                  <th className="py-3">{DOWNLOAD_PAGE.tableVersion}</th>
                  <th className="py-3">{DOWNLOAD_PAGE.tableDate}</th>
                  <th className="py-3">{DOWNLOAD_PAGE.tableSize}</th>
                  <th className="py-3">{DOWNLOAD_PAGE.tableDownload}</th>
                </tr>
              </thead>
              <tbody>
                {previousVersions.map((v) => (
                  <tr key={v.version} className="border-b border-border/60 last:border-0">
                    <td className="py-3 font-mono font-bold">v{v.version}</td>
                    <td className="py-3 text-muted-foreground">{v.releaseDate}</td>
                    <td className="py-3 text-muted-foreground">
                      {v.fileSize ? formatBytes(v.fileSize) : "—"}
                    </td>
                    <td className="py-3">
                      {v.downloadUrl ? (
                        <a href={v.downloadUrl} className="inline-flex items-center gap-1 text-primary hover:underline font-semibold">
                          {DOWNLOAD_PAGE.tableDownload} <Download className="h-3.5 w-3.5" />
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

function MetaCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-3">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-bold">{value}</div>
    </div>
  );
}

function formatBytes(bytes: number, decimals = 2): string {
  if (bytes <= 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
