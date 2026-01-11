'use client';

import { FileType, CheckCircle2, Sparkles } from "lucide-react";

export function Storyboard() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6">
      <div className="grid gap-10 md:grid-cols-2 md:items-start">
        <div className="space-y-4">
          <h2 className="text-balance text-3xl font-black tracking-[-0.03em] text-white md:text-4xl">
            Built for last-night prep.
          </h2>
          <p className="max-w-prose text-pretty text-white/65">
            Upload your notes, let the AI turn them into questions, then answer fast and see your score.
          </p>
        </div>

        <div className="grid gap-3">
          <StepCard
            icon={<FileType className="h-4 w-4" />}
            title="Upload"
            description="PDF notes, slides, handouts."
          />
          <StepCard
            icon={<Sparkles className="h-4 w-4" />}
            title="Generate"
            description="We extract key points and create MCQs."
          />
          <StepCard
            icon={<CheckCircle2 className="h-4 w-4" />}
            title="Quiz"
            description="Answer, submit, and track your score."
          />
        </div>
      </div>
    </section>
  );
}

function StepCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.08),transparent_55%)]" />

      <div className="relative flex items-start gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white/85">
          {icon}
        </div>
        <div>
          <div className="text-sm font-semibold text-white">{title}</div>
          <div className="mt-1 text-sm text-white/60">{description}</div>
        </div>
      </div>
    </div>
  );
}
