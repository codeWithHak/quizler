'use client';

const testimonials = [
  {
    quote:
      "Turned my 40-page notes into a quiz in minutes. Perfect for the night before.",
    name: "Ayaan",
    role: "Engineering student",
  },
  {
    quote:
      "I used it for quick revision — the MCQs made me realize what I actually didn’t know.",
    name: "Mehak",
    role: "Commerce student",
  },
  {
    quote:
      "Clean UI, fast output. Exactly what you need when you’re low on time.",
    name: "Rohit",
    role: "Medical prep",
  },
] as const;

export function Testimonials() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6">
      <div className="flex items-end justify-between gap-6">
        <div>
          <div className="text-xs font-semibold tracking-wide text-[color:var(--ui-muted)]">Proof</div>
          <h2 className="mt-3 text-balance text-3xl font-black tracking-[-0.03em] text-[color:var(--ui-fg)] md:text-4xl">
            Students use it to revise faster.
          </h2>
        </div>
        <div className="hidden text-sm text-[color:var(--ui-muted)] md:block">Short, real, to the point.</div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="relative overflow-hidden rounded-3xl border border-[color:var(--ui-border)] bg-[color:var(--ui-panel)] p-6"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.08),transparent_55%)] opacity-0 transition-opacity duration-300 hover:opacity-100" />

            <blockquote className="relative text-sm leading-relaxed text-[color:var(--ui-fg)]">
              “{t.quote}”
            </blockquote>

            <figcaption className="relative mt-6 flex items-center gap-3 border-t border-[color:var(--ui-border)] pt-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--ui-border)] bg-[color:var(--ui-panel)] text-sm font-semibold text-[color:var(--ui-fg)]">
                {t.name.slice(0, 1)}
              </div>
              <div>
                <div className="text-sm font-semibold text-[color:var(--ui-fg)]">{t.name}</div>
                <div className="text-xs text-[color:var(--ui-muted)]">{t.role}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
