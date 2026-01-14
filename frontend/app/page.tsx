'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Brain, Target } from "lucide-react";
import { useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { UploadFlowDemo } from "@/components/UploadFlowDemo";
import { ToolCards } from "@/components/ToolCards";
import { PricingSection } from "@/components/PricingSection";
import { FAQSection } from "@/components/FAQSection";
import { FinalCTA } from "@/components/FinalCTA";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main ref={containerRef} className="relative flex min-h-screen flex-col">
      {/* Background (theme-driven) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0" style={{ backgroundImage: "var(--landing-bg)" }} />
        <div className="absolute inset-0" style={{ backgroundImage: "var(--landing-spot)" }} />
        <div
          className="absolute inset-0"
          style={{
            opacity: "var(--landing-grid-opacity)",
            backgroundImage: "var(--landing-grid)",
            backgroundSize: "var(--landing-grid-size)",
          }}
        />
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-24 md:px-6 md:pt-36 pb-16">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[color:var(--ui-border)] bg-[color:var(--ui-panel)] px-4 py-2 text-sm text-[color:var(--ui-muted)]">
            <Zap className="h-4 w-4" />
            <span>AI-Powered Study Tool</span>
          </div>

          <h1 className="text-balance text-[clamp(2.8rem,5.5vw,5.5rem)] font-black leading-[0.95] tracking-[-0.04em] text-[color:var(--ui-fg)]">
            Quiz Generator for
            <br />
            <span className="text-[color:var(--ui-muted)]">Procrastinators</span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-[color:var(--ui-muted)] md:text-xl">
            It's 2 AM. Exam tomorrow. You haven't opened the book all semester. 
            We've all been there. Upload your notes, let AI do the heavy lifting, 
            and at least pretend you studied. 💀
          </p>

          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row sm:items-center">
            <Link href="/pdf-to-quiz">
              <Button
                className="group h-14 rounded-full px-10 text-lg font-semibold"
                style={{
                  background: "var(--ui-accent)",
                  color: "var(--ui-accent-contrast)",
                }}
              >
                <span className="flex items-center gap-2">
                  Generate Quiz
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Button>
            </Link>
            <Link href="/text-to-quiz">
              <Button
                variant="ghost"
                className="h-14 rounded-full border px-10 text-lg font-semibold"
                style={{
                  borderColor: "var(--ui-border)",
                  background: "var(--ui-panel)",
                  color: "var(--ui-fg)",
                }}
              >
                Paste Text Instead
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-[color:var(--ui-muted)]">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              <span>AI-Generated Questions</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              <span>Instant Feedback</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              <span>30-Second Setup</span>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <div className="border-t border-[color:var(--ui-border)]">
        <UploadFlowDemo />
      </div>

      {/* Tools Section */}
      <div className="border-t border-[color:var(--ui-border)]">
        <ToolCards />
      </div>

      {/* Pricing Section */}
      <div className="border-t border-[color:var(--ui-border)]">
        <PricingSection />
      </div>

      {/* FAQ Section */}
      <div className="border-t border-[color:var(--ui-border)]">
        <FAQSection />
      </div>

      {/* Final CTA */}
      <div className="border-t border-[color:var(--ui-border)]">
        <FinalCTA />
      </div>
    </main>
  );
}