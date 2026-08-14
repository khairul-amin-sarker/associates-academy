export function InfoPage({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return <section className="py-14 sm:py-20"><div className="section-shell"><div className="max-w-3xl"><p className="text-xs font-bold tracking-[0.16em] text-brand-gold uppercase">{eyebrow}</p><h1 className="font-heading mt-4 text-4xl font-extrabold sm:text-6xl">{title}</h1><div className="mt-7 space-y-5 text-base leading-8 text-muted-foreground">{children}</div></div></div></section>;
}
