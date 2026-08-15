import type { LegalSection } from "@/lib/content/legal";

export function LegalPage({
  eyebrow,
  title,
  description,
  lastUpdated,
  sections,
  aside,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  lastUpdated?: string;
  sections: readonly LegalSection[];
  aside?: React.ReactNode;
}) {
  return (
    <section className="py-14 sm:py-20">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(260px,0.22fr)]">
          <article className="max-w-4xl">
            <p className="text-brand-gold text-xs font-bold tracking-[0.16em] uppercase">
              {eyebrow}
            </p>
            <h1 className="font-heading mt-4 text-4xl leading-tight font-extrabold sm:text-6xl">
              {title}
            </h1>
            {lastUpdated ? (
              <p className="text-brand-indigo mt-4 text-sm font-semibold">
                Last Updated: {lastUpdated}
              </p>
            ) : null}
            {description ? (
              <p className="text-muted-foreground mt-6 text-lg leading-8">
                {description}
              </p>
            ) : null}
            <div className="mt-10 space-y-8">
              {sections.map((section, index) => (
                <section
                  key={`${section.heading ?? "section"}-${index}`}
                  className="border-brand-navy/10 rounded-2xl border bg-white/78 p-6 sm:p-8"
                >
                  {section.heading ? (
                    <h2 className="font-heading text-brand-navy text-2xl font-bold">
                      {section.heading}
                    </h2>
                  ) : null}
                  {section.paragraphs?.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-muted-foreground mt-4 text-base leading-8 whitespace-pre-line"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets ? (
                    <ul className="text-muted-foreground mt-4 space-y-2 text-base leading-7">
                      {section.bullets.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="bg-brand-gold mt-3 h-1.5 w-1.5 shrink-0 rounded-full" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </article>
          {aside ? <aside className="lg:pt-28">{aside}</aside> : null}
        </div>
      </div>
    </section>
  );
}
