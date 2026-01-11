'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FileText, FileType, Sparkles } from "lucide-react";

const navItems = [
  { href: "/pdf-to-quiz", label: "PDF → Quiz", icon: FileType },
  { href: "/text-to-quiz", label: "Text → Quiz", icon: FileText },
  { href: "/pdf-to-text", label: "PDF → Notes", icon: Sparkles },
] as const;

export function SiteShell({
  children,
  hideNav = false,
}: {
  children: React.ReactNode;
  hideNav?: boolean;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-black text-[color:var(--ui-fg)]">
      {/* Atmosphere */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(99,102,241,0.16),transparent_42%),radial-gradient(circle_at_80%_0%,rgba(217,70,239,0.14),transparent_40%),radial-gradient(circle_at_60%_90%,rgba(34,211,238,0.12),transparent_45%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="grain-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black/80" />
      </div>

      <header className="sticky top-0 z-40 border-b border-[color:var(--ui-border)] bg-black/40 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative grid place-items-center">
              <div className="absolute -inset-2 rounded-full bg-[conic-gradient(from_180deg,rgba(34,211,238,0.55),rgba(217,70,239,0.55),rgba(99,102,241,0.55))] blur-md opacity-70 group-hover:opacity-100 transition" />
              <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--ui-border)] bg-black/60">
                <Sparkles className="h-4 w-4 text-[color:var(--ui-fg)]" />
              </div>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-wide text-[color:var(--ui-fg)]">Quizler</div>
              <div className="text-[11px] text-[color:var(--ui-muted)]">Night-before exam drills</div>
            </div>
          </Link>

          {!hideNav && (
            <nav className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => {
                const active = pathname?.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <Button
                    key={item.href}
                    asChild
                    variant="ghost"
                    className={cn(
                      "h-9 rounded-full px-4 text-[color:var(--ui-muted)] hover:text-[color:var(--ui-fg)] hover:bg-[color:var(--ui-hover)]",
                      active && "bg-[color:var(--ui-hover)] text-[color:var(--ui-fg)]"
                    )}
                  >
                    <Link href={item.href} className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </Button>
                );
              })}
            </nav>
          )}

          <div className="flex items-center gap-2">
            <Button
              asChild
              className="h-9 rounded-full bg-[color:var(--ui-accent)] text-[color:var(--ui-accent-contrast)] hover:opacity-90"
            >
              <Link href="/pdf-to-quiz">Generate quiz</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-[color:var(--ui-border)]">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-[color:var(--ui-muted)] md:flex-row md:items-center md:justify-between md:px-6">
          <div>
            <span className="text-[color:var(--ui-fg)]">Quizler</span> — upload notes, get a quiz, pass the exam.
          </div>
          <div className="flex gap-4">
            <Link className="hover:text-[color:var(--ui-fg)]" href="/pdf-to-quiz">PDF → Quiz</Link>
            <Link className="hover:text-[color:var(--ui-fg)]" href="/text-to-quiz">Text → Quiz</Link>
            <Link className="hover:text-[color:var(--ui-fg)]" href="/pdf-to-text">PDF → Notes</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
