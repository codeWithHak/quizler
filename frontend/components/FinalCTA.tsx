'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, BookOpen, Clock } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-24 md:px-6 md:py-32">
      <div className="relative overflow-hidden rounded-[32px] border border-[color:var(--ui-border)] bg-[color:var(--ui-panel)] p-10 md:p-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.12),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.06),transparent_50%)]" />
        
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--ui-border)] bg-[color:var(--ui-hover)] px-4 py-2 text-sm text-[color:var(--ui-muted)] mb-8">
            <Sparkles className="h-4 w-4" />
            <span>Ready to study smarter?</span>
          </div>

          <h2 className="text-balance text-4xl font-black tracking-[-0.03em] text-[color:var(--ui-fg)] md:text-5xl lg:text-6xl">
            Stop rereading.
            <br />
            <span className="text-[color:var(--ui-muted)]">Start practicing.</span>
          </h2>
          
          <p className="mt-6 text-lg leading-relaxed text-[color:var(--ui-muted)] max-w-xl mx-auto">
            Active recall is proven to be 50% more effective than passive reading. 
            Turn your notes into practice questions and walk into your exam with confidence.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
            <Button asChild className="group h-14 rounded-full bg-[color:var(--ui-accent)] px-10 text-lg font-semibold text-[color:var(--ui-accent-contrast)] hover:opacity-90">
              <Link href="/pdf-to-quiz" className="flex items-center gap-2">
                Generate Your First Quiz
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="ghost" className="h-14 rounded-full border border-[color:var(--ui-border)] bg-[color:var(--ui-panel)] px-10 text-lg font-semibold text-[color:var(--ui-fg)] hover:bg-[color:var(--ui-hover)]">
              <Link href="/text-to-quiz">Or Paste Text</Link>
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-[color:var(--ui-muted)]">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Takes 30 seconds</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Works with any subject</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span>100% free to try</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16 text-center">
        <div className="text-xl font-bold tracking-tight text-[color:var(--ui-fg)] mb-2">QUIZLER</div>
        <p className="text-sm text-[color:var(--ui-muted)]">
          AI-powered quiz generator for students who study smarter.
        </p>
        <p className="mt-4 text-xs text-[color:var(--ui-muted)]">
          © 2025 Quizler. Built for backbenchers, by backbenchers.
        </p>
      </div>
    </section>
  );
}
