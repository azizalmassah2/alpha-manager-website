import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/layout/Layout";
import { ReleaseTimeline } from "@/components/releases/ReleaseTimeline";
import { RELEASES_PAGE } from "@/content/ar/releases";

export const Route = createFileRoute("/releases")({
  head: () => ({
    meta: [
      { title: `${RELEASES_PAGE.eyebrow} — Alpha Manager` },
      {
        name: "description",
        content: RELEASES_PAGE.pageHeaderSubtitle,
      },
      { property: "og:title", content: RELEASES_PAGE.pageHeaderTitle },
      { property: "og:url", content: "/releases" },
    ],
    links: [{ rel: "canonical", href: "/releases" }],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow={RELEASES_PAGE.eyebrow}
        title={RELEASES_PAGE.pageHeaderTitle}
        subtitle={RELEASES_PAGE.pageHeaderSubtitle}
      />
      <ReleaseTimeline />
    </SiteLayout>
  );
}
