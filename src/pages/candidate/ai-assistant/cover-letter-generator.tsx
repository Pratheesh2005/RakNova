import { useState } from "react";
import { CandidateLayout } from "@/components/candidate/layout/CandidateLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/utils/cn";

interface CoverLetterResult {
  cover_letter_text: string;
  subject_line: string;
  tone: string;
  key_strengths_highlighted: string[];
  word_count: number;
}

export default function CoverLetterGeneratorPage() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobTitle, setJobTitle] = useState("Full-Stack Software Engineer");
  const [companyName, setCompanyName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [tone, setTone] = useState("Professional & Persuasive");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CoverLetterResult | null>(null);

  const handleGenerate = async () => {
    if (!resumeFile) return;
    setLoading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("resume", resumeFile);
      form.append("job_title", jobTitle);
      form.append("company_name", companyName);
      form.append("job_description", jobDescription);
      form.append("tone", tone);

      let res: Response | null = null;
      try {
        res = await fetch("http://localhost:8000/api/v1/ai/cover-letter/generate", {
          method: "POST",
          body: form,
        });
      } catch {
        res = await fetch("http://127.0.0.1:8000/api/v1/ai/cover-letter/generate", {
          method: "POST",
          body: form,
        });
      }

      const json = await res.json();
      if (json.success) {
        setResult(json.data);
      } else {
        setError(json.error?.message || json.detail || "Cover letter generation failed.");
      }
    } catch {
      setError("Could not connect to RakNova AI service.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result?.cover_letter_text) {
      navigator.clipboard.writeText(result.cover_letter_text);
      alert("Cover letter text copied to clipboard!");
    }
  };

  return (
    <CandidateLayout>
      <Breadcrumb items={[{ label: "AI Career Assistant" }, { label: "AI Cover Letter Generator" }]} className="mb-4" />
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Title */}
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">AI Cover Letter Generator</h1>
          <p className="text-sm text-slate-500 mt-1">
            Generate tailored, highly persuasive cover letters matching your resume to target job roles.
          </p>
        </div>

        {/* Input Form */}
        {!result && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* File Upload */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-800">1. Upload Resume (PDF / DOCX)</label>
                <div className="border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-2xl p-6 text-center bg-slate-50/50">
                  {resumeFile ? (
                    <div>
                      <p className="text-sm font-bold text-slate-900">{resumeFile.name}</p>
                      <button onClick={() => setResumeFile(null)} className="mt-2 text-xs font-semibold text-rose-600 hover:underline">
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs text-slate-500 mb-3">Drop resume here or</p>
                      <label className="inline-block cursor-pointer bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs">
                        Browse Resume
                        <input type="file" accept=".pdf,.docx" className="hidden" onChange={(e) => e.target.files?.[0] && setResumeFile(e.target.files[0])} />
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Target Details */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700">Target Job Title</label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g. Senior Full-Stack Engineer"
                    className="w-full mt-1 border border-slate-300 rounded-xl p-2.5 text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700">Company Name (Optional)</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Google, Microsoft..."
                    className="w-full mt-1 border border-slate-300 rounded-xl p-2.5 text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700">Tone Preference</label>
                  <select value={tone} onChange={(e) => setTone(e.target.value)} className="w-full mt-1 border border-slate-300 rounded-xl p-2.5 text-xs font-medium">
                    <option value="Professional & Persuasive">Professional & Persuasive</option>
                    <option value="Enthusiastic & Modern">Enthusiastic & Modern</option>
                    <option value="Executive & Formal">Executive & Formal</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Optional Job Description */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-800">Job Description (Optional)</label>
              <textarea
                rows={4}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste key job requirements to align keywords in the cover letter..."
                className="w-full border border-slate-300 rounded-2xl p-3 text-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {error && <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs">{error}</div>}

            <div className="flex justify-center">
              <Button variant="primary" size="lg" loading={loading} disabled={!resumeFile || loading} onClick={handleGenerate} className="px-8 shadow-md">
                {loading ? "Generating Cover Letter..." : "Generate AI Cover Letter"}
              </Button>
            </div>
          </div>
        )}

        {/* Generated Cover Letter Result */}
        {result && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Tailored Cover Letter</h3>
                <p className="text-xs text-slate-400 mt-0.5">{result.word_count} words • Tone: {result.tone}</p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  📋 Copy Text
                </Button>
                <Button variant="primary" size="sm" onClick={() => setResult(null)}>
                  Generate New
                </Button>
              </div>
            </div>

            {/* Subject Line */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800">
              Subject Line: <span className="font-normal text-slate-600">{result.subject_line}</span>
            </div>

            {/* Document Content */}
            <div className="p-6 bg-slate-50/50 border border-slate-200 rounded-2xl font-serif text-sm text-slate-800 whitespace-pre-wrap leading-relaxed shadow-inner">
              {result.cover_letter_text}
            </div>

            {/* Key Strengths */}
            {result.key_strengths_highlighted?.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Strengths Highlighted:</span>
                <div className="flex flex-wrap gap-2">
                  {result.key_strengths_highlighted.map((s, idx) => (
                    <Badge key={idx} variant="default" className="bg-indigo-50 text-indigo-800 border-indigo-200">
                      ✨ {s}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </CandidateLayout>
  );
}
