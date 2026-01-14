"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "@/lib/config";
import { PageLayout } from "@/components/PageLayout";

interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

interface QuizResponse {
  questions: QuizQuestion[];
}

export default function TextToQuizPage() {
  const [step, setStep] = useState<"input" | "quiz">("input");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [text, setText] = useState<string>("");
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState<number | null>(null);

  const handleGenerateQuiz = async () => {
    if (!text.trim()) {
      setError("Please enter some text first.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<QuizResponse>(`${API_BASE_URL}/quiz/generate`, {
        text: text,
      });

      setQuiz(response.data.questions);
      setStep("quiz");
    } catch (err: unknown) {
      console.error(err);
      const maybeAxiosErr = err as { response?: { data?: { detail?: unknown } } };
      const errorMessage =
        maybeAxiosErr.response?.data?.detail ||
        "Failed to generate quiz from text. Ensure the backend is running.";
      setError(typeof errorMessage === "string" ? errorMessage : JSON.stringify(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionIndex: number, option: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionIndex]: option }));
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.forEach((q, idx) => {
      if (userAnswers[idx] === q.answer) correct++;
    });
    setScore(correct);
  };

  return (
    <PageLayout>
      <div className="min-h-[calc(100vh-73px)] p-4 md:p-8 flex flex-col">
        <div className="max-w-3xl mx-auto w-full">
          
          {/* Back button */}
          <Link href="/">
            <Button
              variant="ghost"
              className="text-[color:var(--ui-muted)] hover:text-[color:var(--ui-fg)] hover:bg-[color:var(--ui-hover)] mb-6 -ml-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>

          {/* Error Message */}
          {error && (
            <div className="bg-red-900/20 border border-red-800/50 text-red-300 px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          {/* STEP 1: INPUT TEXT */}
          {step === "input" && (
            <div className="space-y-8 mt-8">
              <div className="text-center space-y-3 mb-12">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Text to Quiz</h1>
                <p className="text-lg text-[color:var(--ui-muted)] max-w-md mx-auto">
                  Paste your notes or study material and generate a quiz
                </p>
              </div>

              <Card className="w-full border-[color:var(--ui-border)] bg-[color:var(--ui-panel)] backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-[color:var(--ui-fg)]">Paste Your Text</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid w-full items-center gap-2">
                    <Label htmlFor="text" className="text-[color:var(--ui-muted)]">Study Material</Label>
                    <Textarea
                      id="text"
                      placeholder="Paste your notes, article, or any text here..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="border-[color:var(--ui-border)] bg-[color:var(--ui-panel)] text-[color:var(--ui-fg)] placeholder:text-[color:var(--ui-muted)]/50 min-h-64 focus:border-[color:var(--ui-border)] focus:ring-0 resize-none"
                    />
                  </div>
                  <Button
                    className="w-full bg-[color:var(--ui-accent)] text-[color:var(--ui-accent-contrast)] hover:opacity-90 font-semibold transition-all duration-300"
                    onClick={handleGenerateQuiz}
                    disabled={!text.trim() || loading}
                  >
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {loading ? "Generating Quiz..." : "Generate Quiz"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* STEP 2: QUIZ */}
          {step === "quiz" && (
            <div className="space-y-8 mt-8">
              <div className="text-center space-y-2 mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Take the Quiz</h1>
                <p className="text-[color:var(--ui-muted)]">{quiz.length} questions • {score === null ? "Answer all questions and submit" : "Review your answers"}</p>
              </div>

              <div className="space-y-6">
                {quiz.map((q, idx) => (
                  <Card key={idx} className="border-[color:var(--ui-border)] bg-[color:var(--ui-panel)] backdrop-blur hover:bg-[color:var(--ui-hover)] transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-lg text-[color:var(--ui-fg)]">
                        <span className="mr-2 text-[color:var(--ui-muted)]">Q{idx + 1}.</span>
                        {q.question}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-3">
                      {q.options.map((option, optIdx) => {
                        const isSelected = userAnswers[idx] === option;
                        const isCorrect = option === q.answer;
                        const showResult = score !== null;

                        let bgClass = "bg-[color:var(--ui-panel)] hover:bg-[color:var(--ui-hover)] border-[color:var(--ui-border)]";
                        let textClass = "text-[color:var(--ui-muted)]";

                        if (showResult) {
                          if (isCorrect) {
                            bgClass = "bg-emerald-900/50 border-emerald-700 hover:bg-emerald-900/60";
                            textClass = "text-emerald-200";
                          } else if (isSelected && !isCorrect) {
                            bgClass = "bg-red-900/50 border-red-700 hover:bg-red-900/60";
                            textClass = "text-red-200";
                          }
                        } else {
                          if (isSelected) {
                            bgClass = "bg-[color:var(--ui-hover)] border-[color:var(--ui-fg)]/30 hover:bg-[color:var(--ui-hover)]";
                            textClass = "text-[color:var(--ui-fg)]";
                          }
                        }

                        return (
                          <Button
                            key={optIdx}
                            variant="outline"
                            className={`w-full justify-start text-left h-auto py-3 px-4 border transition-all duration-300 ${bgClass} ${textClass}`}
                            onClick={() => !showResult && handleAnswerSelect(idx, option)}
                            disabled={showResult}
                          >
                            <span className="mr-3 font-semibold text-[color:var(--ui-muted)]">{String.fromCharCode(65 + optIdx)}.</span>
                            {option}
                            {showResult && isCorrect && <CheckCircle2 className="ml-auto h-5 w-5 text-emerald-400" />}
                          </Button>
                        );
                      })}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="sticky bottom-6 flex justify-center">
                {score === null ? (
                  <Button
                    size="lg"
                    className="bg-[color:var(--ui-accent)] text-[color:var(--ui-accent-contrast)] hover:opacity-90 font-semibold px-8 transition-all duration-300"
                    onClick={calculateScore}
                    disabled={Object.keys(userAnswers).length < quiz.length}
                  >
                    Submit Answers
                  </Button>
                ) : (
                  <div className="bg-[color:var(--ui-panel)] border border-[color:var(--ui-border)] text-[color:var(--ui-fg)] px-8 py-4 rounded-full shadow-2xl text-xl font-bold flex flex-col items-center">
                    <div className="text-3xl font-bold mb-1">
                      {score} / {quiz.length}
                    </div>
                    <div className="text-sm text-[color:var(--ui-muted)]">
                      {Math.round((score / quiz.length) * 100)}% Correct
                    </div>
                  </div>
                )}
              </div>

              {score !== null && (
                <div className="flex justify-center pt-4">
                  <Button
                    variant="outline"
                    className="border-[color:var(--ui-border)] text-[color:var(--ui-muted)] hover:text-[color:var(--ui-fg)] hover:bg-[color:var(--ui-hover)]"
                    onClick={() => {
                      setStep("input");
                      setText("");
                      setQuiz([]);
                      setScore(null);
                      setUserAnswers({});
                    }}
                  >
                    Try Another Text
                  </Button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </PageLayout>
  );
}
