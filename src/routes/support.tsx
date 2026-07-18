import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/layout/Layout";
import { ContactSection } from "@/components/support/ContactSection";
import { SUPPORT_PAGE } from "@/content/ar/support";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: `الدعم الفني — Alpha Manager` },
      {
        name: "description",
        content: SUPPORT_PAGE.pageHeaderSubtitle,
      },
      { property: "og:title", content: SUPPORT_PAGE.pageHeaderTitle },
      { property: "og:url", content: "/support" },
    ],
    links: [{ rel: "canonical", href: "/support" }],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow={SUPPORT_PAGE.eyebrow}
        title={SUPPORT_PAGE.pageHeaderTitle}
        subtitle={SUPPORT_PAGE.pageHeaderSubtitle}
      />
      <ContactSection />
    </SiteLayout>
  );
}
