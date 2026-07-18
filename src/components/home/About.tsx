import { ABOUT } from "@/content/ar/home";

export function About() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <span className="rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground">
            {ABOUT.eyebrow}
          </span>
          <h2 className="mt-4 text-3xl font-black md:text-4xl whitespace-pre-line">
            {ABOUT.title}
          </h2>
        </div>
        <div className="space-y-4 text-base leading-8 text-muted-foreground">
          <p>{ABOUT.desc1}</p>
          <p>{ABOUT.desc2}</p>
        </div>
      </div>
    </section>
  );
}
