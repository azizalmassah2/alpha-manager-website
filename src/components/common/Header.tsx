import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Download } from "lucide-react";
import { NAV_LINKS } from "@/content/ar/common";
import { APP_NAME, APP_DOMAIN } from "@/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass border-b border-border/60 shadow-soft" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/10 p-1.5 shadow-soft border border-primary/10">
            <img src="/logos/logo.png" alt={APP_NAME} className="h-6 w-6 object-contain" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-extrabold tracking-tight">{APP_NAME}</div>
            <div className="text-[10px] text-muted-foreground">{APP_DOMAIN}</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="رئيسي">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              activeOptions={{ exact: l.href === "/" }}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground data-[status=active]:bg-accent data-[status=active]:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            to="/download"
            aria-label="تحميل تطبيق ألفا مانجر"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-elegant transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          >
            <Download className="h-4 w-4" />
            تحميل البرنامج
          </Link>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-lg border border-border md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="glass border-t border-border/60 md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3" aria-label="جوال">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/download"
              onClick={() => setOpen(false)}
              aria-label="تحميل تطبيق ألفا مانجر"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-elegant focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              <Download className="h-4 w-4" />
              تحميل البرنامج
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
