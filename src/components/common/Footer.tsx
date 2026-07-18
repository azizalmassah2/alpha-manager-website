import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { NAV_LINKS, FOOTER } from "@/content/ar/common";
import { APP_NAME, APP_DOMAIN } from "@/constants";
import { getVersion, getReleaseDate } from "@/services/update";

export function Footer() {
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
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4 md:px-8">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand shadow-elegant">
              <span className="text-lg font-black text-primary-foreground">α</span>
            </div>
            <div>
              <div className="text-sm font-extrabold">{APP_NAME}</div>
              <div className="text-xs text-muted-foreground">{FOOTER.officialSite}</div>
            </div>
          </div>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            {FOOTER.description}
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold">{FOOTER.quickLinks}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link to={l.href} className="hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold">{FOOTER.legal}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/privacy" className="hover:text-foreground">{FOOTER.privacyPolicy}</Link></li>
            <li><Link to="/terms" className="hover:text-foreground">{FOOTER.termsOfService}</Link></li>
            <li><Link to="/terms" className="hover:text-foreground">{FOOTER.licenseAgreement}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold">{FOOTER.currentVersion}</h4>
          <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
            <div className="text-xs text-muted-foreground">{FOOTER.latestRelease}</div>
            <div className="mt-1 font-mono text-lg font-bold">
              {version ? `v${version}` : "..."}
            </div>
            {date && <div className="mt-1 text-xs text-muted-foreground">{date}</div>}
            <Link
              to="/download"
              className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-brand px-4 py-2 text-xs font-bold text-primary-foreground"
            >
              {FOOTER.downloadNow}
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-muted-foreground md:flex-row md:px-8">
          <div>© {new Date().getFullYear()} {APP_NAME}. {FOOTER.rightsReserved}</div>
          <div>{FOOTER.madeWithCare} · {APP_DOMAIN}</div>
        </div>
      </div>
    </footer>
  );
}
