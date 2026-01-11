"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, FileText, AlertCircle, ArrowLeft, Copy, Download, LayoutTemplate, LayoutList, AlignLeft } from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "@/lib/config";
import { PageLayout } from "@/components/PageLayout";

interface PDFResponse {
  filename: string;
  text: string;
  summary: string;
}

type SummaryStyle = 'card' | 'block' | 'text';

export default function PDFToTextPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [filename, setFilename] = useState<string>("");
  const [summaryStyle, setSummaryStyle] = useState<SummaryStyle>('card');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post<PDFResponse>(`${API_BASE_URL}/pdf/upload`, formData);

      setExtractedText(response.data.text);
      setSummary(response.data.summary);
      setFilename(response.data.filename);
    } catch (err: unknown) {
      console.error(err);
      const maybeAxiosErr = err as { response?: { data?: { detail?: unknown } } };
      const errorMessage =
        maybeAxiosErr.response?.data?.detail ||
        "Failed to extract text from PDF. Ensure the backend is running.";
      setError(typeof errorMessage === "string" ? errorMessage : JSON.stringify(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(extractedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const blob = new Blob([extractedText], { type: "text/plain" });
    element.href = URL.createObjectURL(blob);
    element.download = `${filename.replace(".pdf", "")}_extracted.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <PageLayout>
      <div className="min-h-[calc(100vh-73px)] p-4 md:p-8 flex flex-col">
        <div className="max-w-4xl mx-auto w-full">
          
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

          {/* Upload Section */}
          <div className="space-y-8 mt-8">
            <div className="text-center space-y-3 mb-12">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">PDF to Notes</h1>
              <p className="text-lg text-[color:var(--ui-muted)] max-w-md mx-auto">
                Extract text and get an AI-powered summary from your PDF documents
              </p>
            </div>

            <Card className="w-full max-w-md mx-auto border-[color:var(--ui-border)] bg-[color:var(--ui-panel)] backdrop-blur">
              <CardHeader>
                <CardTitle className="text-[color:var(--ui-fg)]">Upload PDF</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="pdf" className="text-[color:var(--ui-muted)]">PDF Document</Label>
                  <Input
                    id="pdf"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="border-[color:var(--ui-border)] bg-[color:var(--ui-panel)] text-[color:var(--ui-fg)] cursor-pointer file:bg-[color:var(--ui-panel)] file:text-[color:var(--ui-muted)] file:border-0 file:cursor-pointer hover:file:bg-[color:var(--ui-hover)] transition-colors"
                  />
                </div>
                <Button
                  className="w-full bg-[color:var(--ui-accent)] text-[color:var(--ui-accent-contrast)] hover:opacity-90 font-semibold transition-all duration-300"
                  onClick={handleUpload}
                  disabled={!file || loading}
                >
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileText className="mr-2 h-4 w-4" />}
                  {loading ? "Extracting..." : "Extract Text"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          {(extractedText || summary) && (
            <div className="space-y-12 mt-16">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Results</h2>
                <p className="text-[color:var(--ui-muted)]">From: {filename}</p>
              </div>

              {/* Summary Section */}
              {summary && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-[color:var(--ui-fg)]">Summary</h3>
                    <div className="flex bg-[color:var(--ui-panel)] p-1 rounded-lg border border-[color:var(--ui-border)]">
                      <Button
                        variant={summaryStyle === 'card' ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => setSummaryStyle('card')}
                        className={`h-8 px-2 ${summaryStyle === 'card' ? 'bg-[color:var(--ui-hover)] text-[color:var(--ui-fg)]' : 'text-[color:var(--ui-muted)] hover:text-[color:var(--ui-fg)]'}`}
                        title="Card View"
                      >
                        <LayoutTemplate className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={summaryStyle === 'block' ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => setSummaryStyle('block')}
                        className={`h-8 px-2 ${summaryStyle === 'block' ? 'bg-[color:var(--ui-hover)] text-[color:var(--ui-fg)]' : 'text-[color:var(--ui-muted)] hover:text-[color:var(--ui-fg)]'}`}
                        title="Block View"
                      >
                        <LayoutList className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={summaryStyle === 'text' ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => setSummaryStyle('text')}
                        className={`h-8 px-2 ${summaryStyle === 'text' ? 'bg-[color:var(--ui-hover)] text-[color:var(--ui-fg)]' : 'text-[color:var(--ui-muted)] hover:text-[color:var(--ui-fg)]'}`}
                        title="Text View"
                      >
                        <AlignLeft className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {summaryStyle === 'card' && (
                    <Card className="border-[color:var(--ui-border)] bg-[color:var(--ui-panel)] backdrop-blur">
                      <CardContent className="p-6">
                        <p className="text-[color:var(--ui-fg)] leading-relaxed">{summary}</p>
                      </CardContent>
                    </Card>
                  )}

                  {summaryStyle === 'block' && (
                    <div className="bg-[color:var(--ui-panel)] border-l-4 border-blue-500 p-6 rounded-r-xl">
                      <p className="text-[color:var(--ui-fg)] leading-relaxed">{summary}</p>
                    </div>
                  )}

                  {summaryStyle === 'text' && (
                    <div className="px-4 py-2">
                      <p className="text-[color:var(--ui-fg)] leading-relaxed text-lg">{summary}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Extracted Text Section */}
              {extractedText && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-[color:var(--ui-fg)]">Extracted Text</h3>
                  <Card className="border-[color:var(--ui-border)] bg-[color:var(--ui-panel)] backdrop-blur">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-[color:var(--ui-fg)] text-base">Full Content</CardTitle>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[color:var(--ui-border)] text-[color:var(--ui-muted)] hover:text-[color:var(--ui-fg)] hover:bg-[color:var(--ui-hover)]"
                          onClick={handleCopy}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          {copied ? "Copied!" : "Copy"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[color:var(--ui-border)] text-[color:var(--ui-muted)] hover:text-[color:var(--ui-fg)] hover:bg-[color:var(--ui-hover)]"
                          onClick={handleDownload}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-black/30 p-6 rounded-xl border border-[color:var(--ui-border)] max-h-96 overflow-y-auto">
                        <pre className="text-[color:var(--ui-fg)] text-sm whitespace-pre-wrap break-words font-mono leading-relaxed">
                          {extractedText}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              <div className="flex justify-center pt-4">
                <Button
                  variant="outline"
                  className="border-[color:var(--ui-border)] text-[color:var(--ui-muted)] hover:text-[color:var(--ui-fg)] hover:bg-[color:var(--ui-hover)]"
                  onClick={() => {
                    setFile(null);
                    setExtractedText("");
                    setSummary("");
                    setFilename("");
                  }}
                >
                  Extract Another PDF
                </Button>
              </div>
            </div>
          )}

        </div>
      </div>
    </PageLayout>
  );
}
