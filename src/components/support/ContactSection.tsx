import { useEffect, useState } from "react";
import { Mail, Globe, Github, Send } from "lucide-react";
import { SUPPORT_PAGE } from "@/content/ar/support";
import { SUPPORT_EMAIL, APP_DOMAIN, GITHUB_REPO_URL } from "@/constants";
import { fetchSocial } from "@/services/update";
import type { SocialLinks } from "@/types";

export function ContactSection() {
  const [social, setSocial] = useState<SocialLinks | null>(null);

  useEffect(() => {
    fetchSocial()
      .then(setSocial)
      .catch(() => {});
  }, []);

  const email = social?.email || SUPPORT_EMAIL;
  const websiteUrl = social?.website || `https://${APP_DOMAIN}`;
  const displayDomain = social?.website ? social.website.replace("https://", "") : APP_DOMAIN;
  const githubUrl = social?.github || GITHUB_REPO_URL;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 font-sans">
      <div className="grid gap-8 md:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4 text-right">
          <span className="rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground">
            {SUPPORT_PAGE.sectionEyebrow}
          </span>
          <h2 className="text-3xl font-black md:text-4xl">{SUPPORT_PAGE.sectionTitle}</h2>
          <p className="text-muted-foreground leading-7">
            {SUPPORT_PAGE.sectionDescription}
          </p>
          <ul className="space-y-3">
            <ContactItem
              icon={Mail}
              label={SUPPORT_PAGE.emailLabel}
              value={email}
              href={`mailto:${email}`}
            />
            <ContactItem
              icon={Globe}
              label={SUPPORT_PAGE.siteLabel}
              value={displayDomain}
              href={websiteUrl}
            />
            <ContactItem
              icon={Github}
              label={SUPPORT_PAGE.githubLabel}
              value="alpha-manager-updates"
              href={githubUrl}
            />
          </ul>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert(SUPPORT_PAGE.form.successMessage);
          }}
          className="space-y-4 rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8 text-right"
        >
          <div className="grid gap-3 md:grid-cols-2">
            <Field label={SUPPORT_PAGE.form.nameLabel} placeholder={SUPPORT_PAGE.form.namePlaceholder} />
            <Field label={SUPPORT_PAGE.form.emailLabel} placeholder={SUPPORT_PAGE.form.emailPlaceholder} type="email" />
          </div>
          <Field label={SUPPORT_PAGE.form.subjectLabel} placeholder={SUPPORT_PAGE.form.subjectPlaceholder} />
          <div>
            <label className="mb-1 block text-xs font-bold">{SUPPORT_PAGE.form.messageLabel}</label>
            <textarea
              required
              rows={5}
              placeholder={SUPPORT_PAGE.form.messagePlaceholder}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            />
          </div>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-primary-foreground shadow-elegant transition-transform hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          >
            <Send className="h-4 w-4" />
            {SUPPORT_PAGE.form.submitBtn}
          </button>
        </form>
      </div>
    </section>
  );
}

function ContactItem({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <li>
      <a
        href={href}
        className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft transition-colors hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
      >
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground">{label}</div>
          <div className="text-sm font-bold">{value}</div>
        </div>
      </a>
    </li>
  );
}

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="mb-1 block text-xs font-bold">{label}</label>
      <input
        required
        {...props}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
      />
    </div>
  );
}
