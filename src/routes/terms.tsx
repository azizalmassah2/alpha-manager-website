import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/layout/Layout";
import { TERMS_OF_SERVICE } from "@/content/ar/legal";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: `شروط الاستخدام — Alpha Manager` },
      { name: "description", content: TERMS_OF_SERVICE.introduction },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="قانوني"
        title={TERMS_OF_SERVICE.title}
        subtitle={TERMS_OF_SERVICE.lastUpdated}
      />
      <div className="mx-auto max-w-4xl px-4 py-12 md:px-8">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft md:p-10">
          <p className="text-base leading-8 text-muted-foreground mb-8">
            {TERMS_OF_SERVICE.introduction}
          </p>
          <div className="space-y-8">
            {TERMS_OF_SERVICE.sections.map((s) => (
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
