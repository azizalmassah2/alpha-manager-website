import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/layout/Layout";
import { DownloadSection } from "@/components/download/DownloadSection";
import { SystemRequirements } from "@/components/download/SystemRequirements";
import { DOWNLOAD_PAGE } from "@/content/ar/download";

export const Route = createFileRoute("/download")({
  head: () => ({
    meta: [
      { title: `تحميل Alpha Manager — أحدث إصدار` },
      {
        name: "description",
        content: DOWNLOAD_PAGE.pageHeaderSubtitle,
      },
      { property: "og:title", content: DOWNLOAD_PAGE.pageHeaderTitle },
      { property: "og:url", content: "/download" },
    ],
    links: [{ rel: "canonical", href: "/download" }],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow={DOWNLOAD_PAGE.eyebrow}
        title={DOWNLOAD_PAGE.pageHeaderTitle}
        subtitle={DOWNLOAD_PAGE.pageHeaderSubtitle}
      />
      <DownloadSection />
      <SystemRequirements />
    </SiteLayout>
  );
}
