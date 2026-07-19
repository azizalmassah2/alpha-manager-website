import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { NAV_LINKS, FOOTER } from "@/content/ar/common";
import { APP_NAME, APP_DOMAIN } from "@/constants";
import { getVersion, getReleaseDate, fetchSettings } from "@/services/update";
import type { SettingsInfo } from "@/types";

export function Footer() {
  const [version, setVersion] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [settings, setSettings] = useState<SettingsInfo | null>(null);

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
    fetchSettings()
      .then((s) => {
        if (active) setSettings(s);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const appTitle = settings?.appName || APP_NAME;
  const copyrightText = settings?.copyright || `© ${new Date().getFullYear()} ${APP_NAME}. ${FOOTER.rightsReserved}`;
  const websiteUrl = settings?.website || `https://${APP_DOMAIN}`;
  const displayDomain = settings?.website ? settings.website.replace("https://", "") : APP_DOMAIN;

  return (
    <footer className="mt-24 border-t border-border bg-surface font-sans">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4 md:px-8">
        <div className="text-right">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 p-1.5 shadow-soft border border-primary/10">
              <img src="/logos/logo.png" alt={appTitle} className="h-7 w-7 object-contain" loading="lazy" />
            </div>
            <div>
              <div className="text-sm font-extrabold">{appTitle}</div>
              <div className="text-xs text-muted-foreground">{FOOTER.officialSite}</div>
            </div>
          </div>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            {FOOTER.description}
          </p>
        </div>

        <div className="text-right">
          <h4 className="mb-4 text-sm font-bold">{FOOTER.quickLinks}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link to={l.href} className="hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-right">
          <h4 className="mb-4 text-sm font-bold">{FOOTER.legal}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/privacy" className="hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
                {FOOTER.privacyPolicy}
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
                {FOOTER.termsOfService}
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
                {FOOTER.licenseAgreement}
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-right">
          <h4 className="mb-4 text-sm font-bold">{FOOTER.currentVersion}</h4>
          <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
            <div className="text-xs text-muted-foreground">{FOOTER.latestRelease}</div>
            <div className="mt-1 font-mono text-lg font-bold">
              {version ? `v${version}` : "..."}
            </div>
            {date && <div className="mt-1 text-xs text-muted-foreground">{date}</div>}
            <Link
              to="/download"
              aria-label={`تحميل النسخة الأخيرة من ${appTitle}`}
              className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-brand px-4 py-2 text-xs font-bold text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              {FOOTER.downloadNow}
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-muted-foreground md:flex-row md:px-8">
          <div>{copyrightText}</div>
          <div>
            {FOOTER.madeWithCare} ·{" "}
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              {displayDomain}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
