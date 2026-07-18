import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/layout/Layout";
import { FAQSection } from "@/components/faq/FAQSection";
import { FAQ_PAGE } from "@/content/ar/faq";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: `${FAQ_PAGE.eyebrow} — Alpha Manager` },
      {
        name: "description",
        content: FAQ_PAGE.pageHeaderSubtitle,
      },
      { property: "og:title", content: FAQ_PAGE.pageHeaderTitle },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow={FAQ_PAGE.eyebrow}
        title={FAQ_PAGE.pageHeaderTitle}
        subtitle={FAQ_PAGE.pageHeaderSubtitle}
      />
      <FAQSection />
    </SiteLayout>
  );
}
