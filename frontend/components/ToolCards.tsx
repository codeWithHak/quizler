'use client';

import Link from "next/link";
import { ArrowUpRight, FileText, FileType, Sparkles, Clock, Zap, BookOpen } from "lucide-react";

const tools = [
  {
    href: "/pdf-to-quiz",
    title: "PDF to Quiz",
    description: "Upload any PDF document — lecture notes, textbooks, research papers — and get a comprehensive MCQ quiz in seconds. Perfect for exam prep when you're short on time.",
    icon: FileType,
    features: ["Supports multi-page PDFs", "Extracts key concepts", "10+ questions per upload"],
  },
  {
    href: "/text-to-quiz",
    title: "Text to Quiz",
    description: "Paste your notes, copy text from any source, or type your own content. Our AI will analyze it and generate targeted questions to test your understanding.",
    icon: FileText,
    features: ["No file upload needed", "Works with any text", "Instant generation"],
  },
  {
    href: "/pdf-to-text",
    title: "PDF to Notes",
    description: "Extract clean, readable text from your PDFs along with a smart summary. Great for creating study guides or getting a quick overview of dense material.",
    icon: Sparkles,
    features: ["Clean text extraction", "AI-powered summary", "Copy-friendly output"],
  },
] as const;

export function ToolCards() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-24 md:px-6 md:py-32">
      <div className="text-center mb-16">
        <div className="text-xs font-semibold tracking-widest uppercase text-[color:var(--ui-muted)] mb-4">
          Available Tools
        </div>
        <h2 className="text-balance text-4xl font-black tracking-[-0.03em] text-[color:var(--ui-fg)] md:text-5xl mb-4">
          Three ways to study smarter
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-[color:var(--ui-muted)]">
          Choose your input method — whether it's a PDF, pasted text, or document extraction. 
          Same powerful AI, same instant results.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {tools.map((t) => {
          const Icon = t.icon;
          return (
            <Link
              key={t.href}
              href={t.href}
              className="group relative overflow-hidden rounded-3xl border border-[color:var(--ui-border)] bg-[color:var(--ui-panel)] p-8 transition-all duration-300 hover:bg-[color:var(--ui-hover)] hover:border-[color:var(--ui-fg)]/20"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.10),transparent_55%)]" />

              <div className="relative">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[color:var(--ui-border)] bg-[color:var(--ui-panel)] text-[color:var(--ui-fg)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-[color:var(--ui-muted)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--ui-fg)]" />
                </div>

                <div className="text-xl font-bold text-[color:var(--ui-fg)] mb-3">
                  {t.title}
                </div>
                <p className="text-sm leading-relaxed text-[color:var(--ui-muted)] mb-6">
                  {t.description}
                </p>

                <div className="space-y-2">
                  {t.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[color:var(--ui-muted)]">
                      <Zap className="h-3 w-3" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Additional info row */}
      <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-[color:var(--ui-muted)]">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>Average quiz generation: 15 seconds</span>
        </div>
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          <span>Works with any subject</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4" />
          <span>No account required</span>
        </div>
      </div>
    </section>
  );
}
