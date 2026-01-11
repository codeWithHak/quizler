'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, ReactNode } from "react";

export function PageLayout({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen text-[color:var(--ui-fg)] overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
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

      {/* Navigation */}
      <nav className="relative z-20 w-full border-b border-[color:var(--ui-border)] backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 md:px-6">
          <Link href="/" className="group flex items-center gap-2 hover:opacity-80 transition-opacity duration-300">
            <span className="text-xl font-bold tracking-tight">QUIZLER</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            <Link href="/pdf-to-quiz">
              <Button
                variant="ghost"
                className="h-9 rounded-full px-4 text-[color:var(--ui-muted)] hover:text-[color:var(--ui-fg)] hover:bg-[color:var(--ui-hover)]"
              >
                PDF to Quiz
              </Button>
            </Link>
            <Link href="/text-to-quiz">
              <Button
                variant="ghost"
                className="h-9 rounded-full px-4 text-[color:var(--ui-muted)] hover:text-[color:var(--ui-fg)] hover:bg-[color:var(--ui-hover)]"
              >
                Text to Quiz
              </Button>
            </Link>
            <Link href="/pdf-to-text">
              <Button
                variant="ghost"
                className="h-9 rounded-full px-4 text-[color:var(--ui-muted)] hover:text-[color:var(--ui-fg)] hover:bg-[color:var(--ui-hover)]"
              >
                PDF to Notes
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-[color:var(--ui-muted)] hover:text-[color:var(--ui-fg)] hover:bg-[color:var(--ui-hover)]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Mobile Navigation Overlay */}
          {isMenuOpen && (
            <div className="absolute left-0 right-0 top-full z-50 border-b border-[color:var(--ui-border)] bg-black/95 backdrop-blur-xl md:hidden">
              <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-4">
                <Link href="/pdf-to-quiz" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start rounded-xl text-[color:var(--ui-muted)] hover:bg-[color:var(--ui-hover)] hover:text-[color:var(--ui-fg)]"
                  >
                    PDF to Quiz
                  </Button>
                </Link>
                <Link href="/text-to-quiz" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start rounded-xl text-[color:var(--ui-muted)] hover:bg-[color:var(--ui-hover)] hover:text-[color:var(--ui-fg)]"
                  >
                    Text to Quiz
                  </Button>
                </Link>
                <Link href="/pdf-to-text" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start rounded-xl text-[color:var(--ui-muted)] hover:bg-[color:var(--ui-hover)] hover:text-[color:var(--ui-fg)]"
                  >
                    PDF to Notes
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
}
