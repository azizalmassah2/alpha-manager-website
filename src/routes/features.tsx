import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/layout/Layout";
import { Features } from "@/components/features/Features";
import { FinalCTA } from "@/components/home/FinalCTA";
import { FEATURES_PAGE } from "@/content/ar/features";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: `${FEATURES_PAGE.eyebrow} — Alpha Manager` },
      {
        name: "description",
        content: FEATURES_PAGE.pageHeaderSubtitle,
      },
      { property: "og:title", content: FEATURES_PAGE.pageHeaderTitle },
      { property: "og:url", content: "/features" },
    ],
    links: [{ rel: "canonical", href: "/features" }],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow={FEATURES_PAGE.eyebrow}
        title={FEATURES_PAGE.pageHeaderTitle}
        subtitle={FEATURES_PAGE.pageHeaderSubtitle}
      />
      <Features />
      <FinalCTA />
    </SiteLayout>
  );
}
