'use client';

import { FileUp, Sparkles, CheckCircle2 } from "lucide-react";

export function HeroDemo() {
  return (
    <div className="relative">
      {/* Soft spotlight */}
      <div className="pointer-events-none absolute -inset-8 rounded-[40px] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.10),transparent_55%)] blur-2xl" />

      <div className="relative overflow-hidden rounded-[28px] border border-[color:var(--ui-border)] bg-[color:var(--ui-panel)]">
        {/* Hairline highlight */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.06)_35%,transparent_70%)]" />

        <div className="p-5 md:p-6">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold tracking-wide text-[color:var(--ui-muted)]">How it works</div>
            <div className="rounded-full border border-[color:var(--ui-border)] bg-black/25 px-3 py-1 text-[11px] text-[color:var(--ui-muted)]">
              30-sec setup
            </div>
          </div>

          <div className="mt-5 space-y-4">
            <Step
              index="01"
              title="Upload your material"
              description="PDF notes, slides, or pasted text"
              icon={<FileUp className="h-4 w-4" />}
            />
            <Divider />
            <Step
              index="02"
              title="AI generates MCQs"
              description="Key points → questions → options"
              icon={<Sparkles className="h-4 w-4" />}
            />
            <Divider />
            <Step
              index="03"
              title="Answer & score"
              description="Instant feedback to lock it in"
              icon={<CheckCircle2 className="h-4 w-4" />}
            />
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-[color:var(--ui-border)] pt-4 text-xs text-[color:var(--ui-muted)]">
            <div className="text-[color:var(--ui-muted)]">Cram tonight. Perform tomorrow.</div>
            <div className="font-mono text-[11px] text-[color:var(--ui-muted)]">Quizler</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-[color:var(--ui-border)]" />
      <div className="h-1.5 w-1.5 rounded-full bg-[color:var(--ui-border)]" />
      <div className="h-px flex-1 bg-[color:var(--ui-border)]" />
    </div>
  );
}

function Step({
  index,
  title,
  description,
  icon,
}: {
  index: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-0.5 w-10 shrink-0 text-[11px] font-semibold text-[color:var(--ui-muted)]">
        {index}
      </div>

      <div className="flex flex-1 items-start gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--ui-border)] bg-[color:var(--ui-panel)] text-[color:var(--ui-fg)]">
          {icon}
        </div>
        <div>
          <div className="text-sm font-semibold text-[color:var(--ui-fg)]">{title}</div>
          <div className="mt-1 text-xs leading-relaxed text-[color:var(--ui-muted)]">{description}</div>
        </div>
      </div>
    </div>
  );
}
