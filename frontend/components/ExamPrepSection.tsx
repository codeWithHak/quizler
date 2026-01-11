'use client';

import { FileUp, Sparkles, CheckCircle2 } from "lucide-react";

export function ExamPrepSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6">
      <div className="grid gap-10 md:grid-cols-2 md:items-start">
        <div className="space-y-4">
          <div className="text-xs font-semibold tracking-wide text-[color:var(--ui-muted)]">For exam night</div>
          <h2 className="text-balance text-3xl font-black tracking-[-0.03em] text-[color:var(--ui-fg)] md:text-4xl">
            Cram with structure.
          </h2>
          <p className="max-w-prose text-pretty text-[color:var(--ui-muted)]">
            Instead of rereading notes, convert them into questions. It forces recall — the fastest way to prepare.
          </p>
        </div>

        <div className="grid gap-3">
          <CardRow
            icon={<FileUp className="h-4 w-4" />}
            title="Input"
            description="PDF notes, slides, or pasted text."
          />
          <CardRow
            icon={<Sparkles className="h-4 w-4" />}
            title="Transform"
            description="We extract key concepts and generate MCQs."
          />
          <CardRow
            icon={<CheckCircle2 className="h-4 w-4" />}
            title="Practice"
            description="Answer, score, and fix weak spots."
          />
        </div>
      </div>
    </section>
  );
}

function CardRow({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-[color:var(--ui-border)] bg-[color:var(--ui-panel)] px-6 py-5 transition-colors hover:bg-[color:var(--ui-hover)]">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.10),transparent_55%)]" />
      <div className="relative flex items-start gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--ui-border)] bg-[color:var(--ui-panel)] text-[color:var(--ui-fg)]">
          {icon}
        </div>
        <div>
          <div className="text-sm font-semibold text-[color:var(--ui-fg)]">{title}</div>
          <div className="mt-1 text-sm leading-relaxed text-[color:var(--ui-muted)]">{description}</div>
        </div>
      </div>
    </div>
  );
}
