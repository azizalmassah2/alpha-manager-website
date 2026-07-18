import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/layout/Layout";
import { PRIVACY_POLICY } from "@/content/ar/legal";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: `سياسة الخصوصية — Alpha Manager` },
      { name: "description", content: PRIVACY_POLICY.introduction },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="قانوني"
        title={PRIVACY_POLICY.title}
        subtitle={PRIVACY_POLICY.lastUpdated}
      />
      <div className="mx-auto max-w-4xl px-4 py-12 md:px-8">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft md:p-10">
          <p className="text-base leading-8 text-muted-foreground mb-8">
            {PRIVACY_POLICY.introduction}
          </p>
          <div className="space-y-8">
            {PRIVACY_POLICY.sections.map((s) => (
              <div key={s.title}>
                <h3 className="text-lg font-bold mb-3">{s.title}</h3>
                <p className="text-sm leading-7 text-muted-foreground">{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
