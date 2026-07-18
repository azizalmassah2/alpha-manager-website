import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { About } from "@/components/home/About";
import { Features } from "@/components/features/Features";
import { Screenshots } from "@/components/home/Screenshots";
import { SystemRequirements } from "@/components/download/SystemRequirements";
import { FAQSection } from "@/components/faq/FAQSection";
import { FinalCTA } from "@/components/home/FinalCTA";
import { APP_NAME, APP_TAGLINE } from "@/constants";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${APP_NAME} — ${APP_TAGLINE}` },
      {
        name: "description",
        content: `برنامج ${APP_NAME}: تطبيق سطح المكتب الاحترافي لإدارة أجهزة MikroTik وأجهزة البث والمستخدمين والبطاقات والتراخيص بواجهة عربية سريعة.`,
      },
      { property: "og:title", content: `${APP_NAME} — ${APP_TAGLINE}` },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      <Hero />
      <Stats />
      <About />
      <Features compact />
      <Screenshots />
      <SystemRequirements />
      <FAQSection />
      <FinalCTA />
    </SiteLayout>
  );
}
