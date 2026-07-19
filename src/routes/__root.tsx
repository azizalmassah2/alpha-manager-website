import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { APP_NAME, APP_TAGLINE, APP_DOMAIN } from "@/constants";
import { initGA, initClarity, trackPageView } from "@/lib/analytics";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10 text-primary shadow-soft">
          <img src="/logos/logo.png" alt={APP_NAME} className="h-10 w-10 object-contain" />
        </div>
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">الصفحة غير موجودة</h2>
        <p className="mt-2 text-sm text-muted-foreground font-medium">
          الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            العودة إلى الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10 text-primary shadow-soft">
          <img src="/logos/logo.png" alt={APP_NAME} className="h-10 w-10 object-contain" />
        </div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          حدث خطأ أثناء تحميل الصفحة
        </h1>
        <p className="mt-2 text-sm text-muted-foreground font-medium">
          يرجى المحاولة مرة أخرى أو العودة إلى الصفحة الرئيسية.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            إعادة المحاولة
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-input bg-background px-5 py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-accent"
          >
            الرئيسية
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${APP_NAME} — ${APP_TAGLINE}` },
      {
        name: "description",
        content: `برنامج ${APP_NAME}: تطبيق سطح المكتب الاحترافي لإدارة أجهزة MikroTik وأجهزة البث والمستخدمين والبطاقات والتراخيص بواجهة عربية سريعة.`,
      },
      { name: "author", content: APP_NAME },
      { property: "og:title", content: `${APP_NAME} — ${APP_TAGLINE}` },
      {
        property: "og:description",
        content: `برنامج ${APP_NAME}: تطبيق سطح المكتب الاحترافي لإدارة أجهزة MikroTik وأجهزة البث والمستخدمين والبطاقات والتراخيص بواجهة عربية سريعة.`,
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: APP_NAME },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${APP_NAME} — ${APP_TAGLINE}` },
      { name: "twitter:description", content: `برنامج ${APP_NAME}: تطبيق سطح المكتب الاحترافي لإدارة أجهزة MikroTik وأجهزة البث والمستخدمين والبطاقات والتراخيص بواجهة عربية سريعة.` },
      { property: "og:image", content: `https://${APP_DOMAIN}/logos/logo.png` },
      { name: "twitter:image", content: `https://${APP_DOMAIN}/logos/logo.png` },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico?v=2", type: "image/x-icon" },
      { rel: "apple-touch-icon", href: "/icons/icon-512.png?v=2" },
      { rel: "manifest", href: "/manifest.webmanifest?v=2" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=Tajawal:wght@400;500;700;900&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": APP_NAME,
    "url": `https://${APP_DOMAIN}`,
    "logo": `https://${APP_DOMAIN}/logos/logo.png`,
    "email": "support@alphamanager.app",
    "sameAs": [
      "https://github.com/azizalmassah2/alpha-manager-website"
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": APP_NAME,
    "operatingSystem": "Windows 10, Windows 11",
    "applicationCategory": "NetworkingApplication",
    "downloadUrl": `https://${APP_DOMAIN}/download`,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const state = useRouterState();

  useEffect(() => {
    initGA();
    initClarity();
  }, []);

  useEffect(() => {
    trackPageView(state.location.pathname);
  }, [state.location.pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
