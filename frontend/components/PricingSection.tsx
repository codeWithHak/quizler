'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Zap } from "lucide-react";

const tiers = [
  {
    name: "Free",
    price: "₹0",
    sub: "For quick revision",
    description: "Perfect for trying out the tool and quick study sessions. No credit card required.",
    features: [
      "Generate quizzes from pasted text",
      "Up to 10 questions per quiz",
      "Basic MCQ format",
      "Instant feedback on answers",
      "No account required",
    ],
    cta: "Start Free",
    href: "/text-to-quiz",
    highlight: false,
    icon: Zap,
  },
  {
    name: "Pro",
    price: "$4.99",
    sub: "Per month",
    description: "Unlock the full power of Quizler with PDF uploads, more questions, and priority processing.",
    features: [
      "Everything in Free",
      "PDF document upload",
      "PDF to Notes extraction",
      "Up to 25 questions per quiz",
      "Detailed explanations for answers",
      "Priority queue (faster generation)",
      "Download quizzes as PDF",
    ],
    cta: "Upgrade to Pro",
    href: "/pdf-to-quiz",
    highlight: true,
    icon: Sparkles,
  },
] as const;

export function PricingSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-24 md:px-6 md:py-32">
      <div className="text-center mb-16">
        <div className="text-xs font-semibold tracking-widest uppercase text-[color:var(--ui-muted)] mb-4">
          Pricing
        </div>
        <h2 className="text-balance text-4xl font-black tracking-[-0.03em] text-[color:var(--ui-fg)] md:text-5xl mb-4">
          Simple, transparent pricing
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-[color:var(--ui-muted)]">
          Start free with text-based quizzes. Upgrade when you need PDF support 
          and more advanced features. No hidden fees, cancel anytime.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
        {tiers.map((t) => {
          const Icon = t.icon;
          return (
            <div
              key={t.name}
              className={`relative overflow-hidden rounded-3xl border p-8 md:p-10 ${
                t.highlight
                  ? "border-[color:var(--ui-fg)]/20 bg-[color:var(--ui-hover)]"
                  : "border-[color:var(--ui-border)] bg-[color:var(--ui-panel)]"
              }`}
            >
              {t.highlight && (
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_10%,rgba(255,255,255,0.14),transparent_55%)]" />
              )}

              <div className="relative">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[color:var(--ui-border)] bg-[color:var(--ui-panel)] text-[color:var(--ui-fg)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  {t.highlight && (
                    <div className="rounded-full border border-[color:var(--ui-border)] bg-[color:var(--ui-panel)] px-3 py-1 text-xs font-semibold text-[color:var(--ui-muted)]">
                      Most Popular
                    </div>
                  )}
                </div>

                <div className="text-lg font-bold text-[color:var(--ui-fg)]">{t.name}</div>
                <div className="mt-2 flex items-end gap-2">
                  <span className="text-5xl font-black tracking-[-0.03em] text-[color:var(--ui-fg)]">
                    {t.price}
                  </span>
                  {t.name === "Pro" && (
                    <span className="pb-2 text-sm text-[color:var(--ui-muted)]">/month</span>
                  )}
                </div>
                <p className="mt-3 text-sm text-[color:var(--ui-muted)]">{t.description}</p>

                <ul className="mt-8 space-y-3 text-sm text-[color:var(--ui-muted)]">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border border-[color:var(--ui-border)] bg-[color:var(--ui-panel)]">
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <Button
                    asChild
                    className={`h-12 w-full rounded-full text-base font-semibold transition-all duration-300 ${
                      t.highlight
                        ? "bg-[color:var(--ui-accent)] text-[color:var(--ui-accent-contrast)] hover:scale-[1.02] hover:shadow-lg hover:shadow-white/10"
                        : "border border-[color:var(--ui-border)] bg-transparent text-[color:var(--ui-fg)] hover:border-[color:var(--ui-fg)]/50 hover:bg-white/5"
                    }`}
                  >
                    <Link href={t.href}>{t.cta}</Link>
                  </Button>
                </div>

                <div className="mt-4 text-xs text-center text-[color:var(--ui-muted)]">
                  {t.highlight ? "14-day free trial included" : "No credit card required"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
