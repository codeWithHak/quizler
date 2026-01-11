'use client';

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "What file types can I upload?",
    a: "Currently you can upload PDF documents and paste plain text. We support lecture notes, textbook chapters, research papers, slides exported as PDFs, and any other text-based study material. Support for Word documents and images with text is coming soon.",
  },
  {
    q: "How many questions will the quiz have?",
    a: "The AI generates between 5-15 questions depending on the amount of content you provide. Longer documents or more detailed text will produce more comprehensive quizzes. We're working on letting you customize the exact number of questions.",
  },
  {
    q: "How accurate are the generated questions?",
    a: "Our AI is trained to extract key concepts and create relevant MCQs. It works best for revision and practice purposes. For high-stakes exams, we recommend using it as a supplementary study tool alongside your regular materials. Always verify important facts.",
  },
  {
    q: "Do I need to create an account?",
    a: "No account is required to use any of the tools. You can generate quizzes instantly without signing up. In the future, we'll add optional accounts for features like saving quiz history, tracking progress, and personalized recommendations.",
  },
  {
    q: "Is my uploaded content stored or shared?",
    a: "Your privacy is important. Uploaded documents and text are processed to generate quizzes and are not stored permanently on our servers. We don't share your content with third parties or use it for training purposes.",
  },
  {
    q: "What subjects does this work for?",
    a: "Quizler works with any subject that has factual, concept-based content — sciences, history, business, law, medicine, engineering, and more. It's particularly effective for subjects with clear definitions, processes, and facts that can be tested via MCQs.",
  },
] as const;

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-24 md:px-6 md:py-32">
      <div className="grid gap-12 md:grid-cols-2 md:items-start">
        {/* Left: Header */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[color:var(--ui-muted)]">
            <HelpCircle className="h-4 w-4" />
            <span>FAQ</span>
          </div>
          <h2 className="text-balance text-4xl font-black tracking-[-0.03em] text-[color:var(--ui-fg)] md:text-5xl">
            Got questions?
          </h2>
          <p className="max-w-prose text-lg leading-relaxed text-[color:var(--ui-muted)]">
            Here are answers to the most common questions about how Quizler works, 
            what you can upload, and how to get the best results from your study sessions.
          </p>
        </div>

        {/* Right: Accordion */}
        <div className="overflow-hidden rounded-3xl border border-[color:var(--ui-border)] bg-[color:var(--ui-panel)]">
          {faqs.map((item, idx) => {
            const open = openIndex === idx;
            return (
              <div key={item.q} className="border-t border-[color:var(--ui-border)] first:border-t-0">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-[color:var(--ui-hover)]"
                  onClick={() => setOpenIndex(open ? null : idx)}
                >
                  <span className="text-sm font-semibold text-[color:var(--ui-fg)]">{item.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-[color:var(--ui-muted)] transition-transform duration-200 ${
                      open ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
                {open && (
                  <div className="px-6 pb-6 pt-0 text-sm leading-relaxed text-[color:var(--ui-muted)]">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
