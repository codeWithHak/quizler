'use client';

import { useState } from "react";
import { FileUp, Sparkles, CheckCircle2, ArrowRight, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";

type DemoStep = "upload" | "generating" | "quiz";

const sampleQuiz = {
  question: "What is the primary function of mitochondria in a cell?",
  options: [
    "A) Protein synthesis",
    "B) Energy production (ATP)",
    "C) Cell division",
    "D) Waste removal",
  ],
  correctIndex: 1,
};

export function UploadFlowDemo() {
  const [step, setStep] = useState<DemoStep>("upload");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleNext = () => {
    if (step === "upload") {
      setStep("generating");
      setTimeout(() => setStep("quiz"), 1200);
    }
  };

  const handleOptionClick = (idx: number) => {
    if (!showResult) {
      setSelectedOption(idx);
    }
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setStep("upload");
    setSelectedOption(null);
    setShowResult(false);
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-24 md:px-6 md:py-32">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        {/* Left: Description */}
        <div className="space-y-6">
          <div className="text-xs font-semibold tracking-widest uppercase text-[color:var(--ui-muted)]">
            Interactive Demo
          </div>
          <h2 className="text-balance text-4xl font-black tracking-[-0.03em] text-[color:var(--ui-fg)] md:text-5xl">
            See how it works in action
          </h2>
          <p className="max-w-prose text-lg leading-relaxed text-[color:var(--ui-muted)]">
            Upload your study material — whether it's a PDF, lecture notes, or just pasted text. 
            Our AI extracts the key concepts and generates targeted multiple-choice questions 
            to test your understanding. Click "Next" to see the magic happen.
          </p>
          <ul className="space-y-3 text-[color:var(--ui-muted)]">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 mt-0.5 text-emerald-400" />
              <span>Works with PDFs, text, and lecture slides</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 mt-0.5 text-emerald-400" />
              <span>AI identifies key concepts automatically</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 mt-0.5 text-emerald-400" />
              <span>Get instant feedback on your answers</span>
            </li>
          </ul>
        </div>

        {/* Right: Interactive Preview Panel */}
        <div className="relative overflow-hidden rounded-[28px] border border-[color:var(--ui-border)] bg-[color:var(--ui-panel)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.10),transparent_55%)]" />
          <div className="relative p-6 md:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-xs font-semibold tracking-wide text-[color:var(--ui-muted)]">
                {step === "upload" && "Step 1: Upload"}
                {step === "generating" && "Step 2: Generating..."}
                {step === "quiz" && "Step 3: Quiz"}
              </div>
              <div className="flex items-center gap-2">
                <Circle className={`h-2 w-2 ${step === "upload" ? "fill-[color:var(--ui-fg)]" : "fill-[color:var(--ui-muted)]/30"}`} />
                <Circle className={`h-2 w-2 ${step === "generating" ? "fill-[color:var(--ui-fg)]" : "fill-[color:var(--ui-muted)]/30"}`} />
                <Circle className={`h-2 w-2 ${step === "quiz" ? "fill-[color:var(--ui-fg)]" : "fill-[color:var(--ui-muted)]/30"}`} />
              </div>
            </div>

            {/* Upload State */}
            {step === "upload" && (
              <div className="space-y-4">
                <FlowRow
                  icon={<FileUp className="h-4 w-4" />}
                  title="Upload"
                  meta="biology_notes.pdf"
                  active
                />
                <FlowRow
                  icon={<Sparkles className="h-4 w-4" />}
                  title="Generate"
                  meta="Waiting..."
                />
                <FlowRow
                  icon={<CheckCircle2 className="h-4 w-4" />}
                  title="Quiz"
                  meta="Waiting..."
                />
              </div>
            )}

            {/* Generating State */}
            {step === "generating" && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="relative">
                  <Sparkles className="h-12 w-12 text-[color:var(--ui-fg)] animate-pulse" />
                </div>
                <p className="mt-4 text-sm text-[color:var(--ui-muted)]">Analyzing content and generating questions...</p>
              </div>
            )}

            {/* Quiz State */}
            {step === "quiz" && (
              <div className="space-y-4">
                <div className="text-sm font-medium text-[color:var(--ui-fg)]">
                  {sampleQuiz.question}
                </div>
                <div className="space-y-2">
                  {sampleQuiz.options.map((opt, idx) => {
                    let bgClass = "bg-[color:var(--ui-panel)] border-[color:var(--ui-border)] hover:bg-[color:var(--ui-hover)]";
                    if (showResult) {
                      if (idx === sampleQuiz.correctIndex) {
                        bgClass = "bg-emerald-900/40 border-emerald-600";
                      } else if (idx === selectedOption && idx !== sampleQuiz.correctIndex) {
                        bgClass = "bg-red-900/40 border-red-600";
                      }
                    } else if (idx === selectedOption) {
                      bgClass = "bg-[color:var(--ui-hover)] border-[color:var(--ui-fg)]/30";
                    }
                    return (
                      <button
                        key={idx}
                        onClick={() => handleOptionClick(idx)}
                        disabled={showResult}
                        className={`w-full text-left px-4 py-3 rounded-xl border text-sm text-[color:var(--ui-fg)] transition-all ${bgClass}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {!showResult && selectedOption !== null && (
                  <Button
                    onClick={handleSubmit}
                    className="w-full mt-2"
                    style={{ background: "var(--ui-accent)", color: "var(--ui-accent-contrast)" }}
                  >
                    Submit Answer
                  </Button>
                )}
                {showResult && (
                  <div className="text-center pt-2">
                    <p className={`text-sm font-medium ${selectedOption === sampleQuiz.correctIndex ? "text-emerald-400" : "text-red-400"}`}>
                      {selectedOption === sampleQuiz.correctIndex ? "Correct! 🎉" : "Incorrect. The answer is B."}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="mt-6 flex items-center justify-between border-t border-[color:var(--ui-border)] pt-5">
              <div className="text-xs text-[color:var(--ui-muted)]">
                {step === "quiz" ? "Quiz Preview" : "Preview Panel"}
              </div>
              {step === "upload" && (
                <Button
                  onClick={handleNext}
                  variant="ghost"
                  className="flex items-center gap-2 text-sm font-semibold text-[color:var(--ui-fg)] hover:bg-[color:var(--ui-hover)]"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
              {step === "quiz" && showResult && (
                <Button
                  onClick={handleReset}
                  variant="ghost"
                  className="text-sm font-semibold text-[color:var(--ui-muted)] hover:text-[color:var(--ui-fg)] hover:bg-[color:var(--ui-hover)]"
                >
                  Try Again
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FlowRow({
  icon,
  title,
  meta,
  active = false,
}: {
  icon: React.ReactNode;
  title: string;
  meta: string;
  active?: boolean;
}) {
  return (
    <div className={`flex items-center justify-between rounded-2xl border px-4 py-3 transition-all ${
      active 
        ? "border-[color:var(--ui-fg)]/20 bg-[color:var(--ui-hover)]" 
        : "border-[color:var(--ui-border)] bg-[color:var(--ui-panel)]"
    }`}>
      <div className="flex items-center gap-3">
        <div className={`flex h-9 w-9 items-center justify-center rounded-full border ${
          active 
            ? "border-[color:var(--ui-fg)]/30 bg-[color:var(--ui-panel)] text-[color:var(--ui-fg)]" 
            : "border-[color:var(--ui-border)] bg-[color:var(--ui-panel)] text-[color:var(--ui-muted)]"
        }`}>
          {icon}
        </div>
        <div>
          <div className={`text-sm font-semibold ${active ? "text-[color:var(--ui-fg)]" : "text-[color:var(--ui-muted)]"}`}>
            {title}
          </div>
          <div className="text-xs text-[color:var(--ui-muted)]">{meta}</div>
        </div>
      </div>

      {active && (
        <div className="h-2 w-16 overflow-hidden rounded-full border border-[color:var(--ui-border)] bg-[color:var(--ui-panel)]">
          <div className="h-full w-full bg-emerald-500/60 animate-pulse" />
        </div>
      )}
    </div>
  );
}
