import type { ReactNode } from "react";
import { Header } from "../common/Header";
import { Footer } from "../common/Footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-hero">
      <div className="mx-auto max-w-7xl px-4 pb-14 pt-16 text-center md:px-8 md:pt-24">
        {eyebrow && (
          <div className="mx-auto mb-4 inline-flex rounded-full border border-border bg-background/70 px-4 py-1.5 text-xs font-semibold text-primary shadow-soft glass">
            {eyebrow}
          </div>
        )}
        <h1 className="mx-auto max-w-3xl text-4xl font-black leading-tight md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
