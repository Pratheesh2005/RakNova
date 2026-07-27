import { useState } from "react";
import { CandidateLayout } from "@/components/candidate/layout/CandidateLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/utils/cn";

interface MatchBreakdown {
  skills_match: number;
  experience_match: number;
  education_match: number;
  certifications_match: number;
  ats_keyword_match: number;
  responsibilities_match: number;
  domain_match: number;
}

interface AnalysisResponse {
  overall_match: number;
  match_level: string;
  match_breakdown: MatchBreakdown;
  matching_skills: string[];
  missing_skills: string[];
  experience_comparison: { resume_experience: string; job_requirement: string; match_percentage: number };
  education_comparison: { resume_education: string; job_requirement: string; status: string };
  certifications_summary: string;
  responsibilities_comparison: { responsibility: string; matched: boolean }[];
  ai_hiring_decision: string;
  interview_probability: number;
  salary_estimate: string;
  resume_improvements: string[];
  keyword_coverage: Record<string, number>;
  strengths: string[];
  weaknesses: string[];
  missing_requirements: string[];
  recommendations: string[];
}

const MatchLevelColors: Record<string, string> = {
  "Excellent Match": "text-green-600 bg-green-50",
  "Good Match": "text-blue-600 bg-blue-50",
  "Average Match": "text-yellow-600 bg-yellow-50",
  "Low Match": "text-red-600 bg-red-50",
};

export default function JobMatchAnalyzerPage() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jdText, setJdText] = useState("");
  const [jdFile, setJdFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [processingStep, setProcessingStep] = useState("");

  const handleResumeFile = (file: File) => {
    if (!file.type.includes("pdf") && !file.type.includes("docx")) {
      setError("Resume must be PDF or DOCX.");
      return;
    }
    setResumeFile(file);
    setError(null);
  };

  const handleOptimize = async () => {
    if (!resumeFile) return;
    if (!jdText.trim() && !jdFile) {
      setError("Please provide a job description (paste or upload).");
      return;
    }
    setLoading(true);
    setError(null);
    const steps = [
      "Reading Resume...",
      "Reading Job Description...",
      "Extracting Skills...",
      "Matching Experience...",
      "Comparing Responsibilities...",
      "Calculating Match Score...",
      "Generating Recommendations...",
      "Preparing Report..."
    ];
    let stepIdx = 0;
    const interval = setInterval(() => {
      if (stepIdx < steps.length) setProcessingStep(steps[stepIdx++]);
    }, 800);

    try {
      const formData = new FormData();
      formData.append("resume_file", resumeFile);
      if (jdText.trim()) formData.append("job_description", jdText);
      if (jdFile) formData.append("jd_file", jdFile);

      let res: Response | null = null;
      try {
        res = await fetch("http://localhost:8000/api/v1/ai/job-match/analyze", {
          method: "POST",
          body: formData,
        });
      } catch {
        res = await fetch("http://127.0.0.1:8000/api/v1/ai/job-match/analyze", {
          method: "POST",
          body: formData,
        });
      }

      const json = await res.json();
      if (json.success) {
        setResult(json.data);
      } else {
        setError(json.error?.message || json.detail || "Analysis failed.");
      }
    } catch (err) {
      setError("Could not connect to the AI service.");
    } finally {
      clearInterval(interval);
      setLoading(false);
      setProcessingStep("");
    }
  };

  return (
    <CandidateLayout>
      <Breadcrumb items={[{ label: "AI Career Assistant" }, { label: "Job Match Analyzer" }]} className="mb-4" />
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Match Analyzer</h1>
          <p className="text-sm text-gray-500 mt-1">
            See how well your resume matches a specific job and get actionable insights to improve your fit.
          </p>
        </div>

        {!result && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Resume Upload */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-lg font-semibold mb-4">1. Upload Resume</h3>
              <div
                onDragOver={(e) => { e.preventDefault(); }}
                onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files[0]) handleResumeFile(e.dataTransfer.files[0]); }}
                className={cn("border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer", "border-gray-300 hover:border-gray-400")}
              >
                {resumeFile ? (
                  <div>
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </div>
                    <p className="text-sm font-medium">{resumeFile.name}</p>
                    <button onClick={() => setResumeFile(null)} className="mt-2 text-xs text-red-600">Remove</button>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-gray-500">Drop resume here or</p>
                    <label className="mt-2 inline-block cursor-pointer text-blue-600 hover:underline text-sm font-medium">
                      Browse
                      <input type="file" accept=".pdf,.docx" className="hidden" onChange={(e) => e.target.files?.[0] && handleResumeFile(e.target.files[0])} />
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Job Description Input */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-lg font-semibold mb-4">2. Job Description</h3>
              <textarea
                rows={8}
                className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Paste the job description here..."
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
                disabled={!!jdFile}
              />
              <div className="mt-2 text-sm text-gray-500">or</div>
              <div className="mt-1 flex items-center gap-2">
                <label className="cursor-pointer text-blue-600 text-sm hover:underline">
                  Upload JD File (PDF/DOCX)
                  <input type="file" accept=".pdf,.docx" className="hidden" onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setJdFile(e.target.files[0]);
                      setJdText("");
                    }
                  }} />
                </label>
                {jdFile && (
                  <span className="text-xs text-gray-600">{jdFile.name} <button onClick={() => setJdFile(null)} className="text-red-500 ml-1">Remove</button></span>
                )}
              </div>
            </div>
          </div>
        )}

        {error && <div className="p-3 bg-red-50 text-red-700 rounded-xl text-sm">{error}</div>}

        {!result && (
          <div className="flex justify-center">
            <Button variant="primary" size="lg" loading={loading} onClick={handleOptimize} disabled={!resumeFile}>
              {loading ? (processingStep || "Analyzing...") : "Analyze Match"}
            </Button>
          </div>
        )}

        {loading && processingStep && (
          <div className="text-center text-sm text-gray-500 animate-pulse">{processingStep}</div>
        )}

        {result && (
          <div className="space-y-8">
            {/* Overall Score */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 flex flex-col items-center">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                    <circle cx="60" cy="60" r="52" fill="none" stroke="url(#jobMatchGrad)" strokeWidth="10" strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 52}`}
                      strokeDashoffset={`${2 * Math.PI * 52 * (1 - result.overall_match / 100)}`} />
                    <defs>
                      <linearGradient id="jobMatchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1a6fff" /><stop offset="100%" stopColor="#6c5ce7" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold">{result.overall_match}%</span>
                  </div>
                </div>
                <Badge variant="default" className={cn("mt-2", MatchLevelColors[result.match_level])}>{result.match_level}</Badge>
              </div>

              <div className="bg-white rounded-2xl p-6 col-span-2">
                <h3 className="text-lg font-semibold mb-4">Match Breakdown</h3>
                <div className="space-y-3">
                  {Object.entries(result.match_breakdown).map(([key, value]) => (
                    <ProgressBar key={key} label={key.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())} value={value} size="sm" color="brand" />
                  ))}
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-green-700 mb-3">Matching Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {result.matching_skills.map(skill => (
                    <Badge key={skill} variant="default" className="bg-green-50 text-green-700">✓ {skill}</Badge>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-red-700 mb-3">Missing Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {result.missing_skills.map(skill => (
                    <Badge key={skill} variant="default" className="bg-red-50 text-red-700">✗ {skill}</Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Experience & Education */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-3">Experience Match</h3>
                <p className="text-sm"><strong>Resume:</strong> {result.experience_comparison.resume_experience}</p>
                <p className="text-sm mt-2"><strong>Job Requirement:</strong> {result.experience_comparison.job_requirement}</p>
                <ProgressBar value={result.experience_comparison.match_percentage} size="sm" color="brand" className="mt-2" />
              </div>
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-3">Education Match</h3>
                <p className="text-sm"><strong>Resume:</strong> {result.education_comparison.resume_education}</p>
                <p className="text-sm mt-2"><strong>Requirement:</strong> {result.education_comparison.job_requirement}</p>
                <Badge variant="default" className={cn("mt-2", 
                  result.education_comparison.status === "Matched" ? "bg-green-50 text-green-700" :
                  result.education_comparison.status === "Partially Matched" ? "bg-yellow-50 text-yellow-700" :
                  "bg-red-50 text-red-700"
                )}>{result.education_comparison.status}</Badge>
              </div>
            </div>

            {/* Responsibilities */}
            <div className="bg-white rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Responsibilities Comparison</h3>
              <div className="space-y-2">
                {result.responsibilities_comparison.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    {item.matched ? (
                      <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    ) : (
                      <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    )}
                    <span>{item.responsibility}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Hiring Decision & Interview Probability */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-3">AI Hiring Decision</h3>
                <p className="text-sm">{result.ai_hiring_decision}</p>
              </div>
              <div className="bg-white rounded-2xl p-6 flex flex-col items-center">
                <h3 className="text-lg font-semibold mb-3">Interview Probability</h3>
                <div className="relative w-24 h-24">
                  <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="8" strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - result.interview_probability / 100)}`} />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xl font-bold">{result.interview_probability}%</span>
                </div>
              </div>
            </div>

            {/* Salary Estimate */}
            <div className="bg-white rounded-2xl p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Estimated Salary</h3>
              <p className="text-2xl font-bold text-blue-600">{result.salary_estimate}</p>
              <p className="text-xs text-gray-500">AI estimate based on skills, experience, and location</p>
            </div>

            {/* Resume Improvements & Missing Requirements */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">Resume Improvements for This Job</h3>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {result.resume_improvements.map((item, idx) => <li key={idx}>{item}</li>)}
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">Missing Requirements</h3>
                <ul className="list-disc list-inside text-sm text-red-600 space-y-1">
                  {result.missing_requirements.map((item, idx) => <li key={idx}>{item}</li>)}
                </ul>
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-green-700 mb-3">Strengths</h3>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {result.strengths.map((s, idx) => <li key={idx}>{s}</li>)}
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-yellow-700 mb-3">Weaknesses</h3>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {result.weaknesses.map((w, idx) => <li key={idx}>{w}</li>)}
                </ul>
              </div>
            </div>

            {/* Keyword Coverage */}
            {result.keyword_coverage && (
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">Keyword Coverage</h3>
                <div className="space-y-2">
                  {Array.isArray(result.keyword_coverage)
                    ? result.keyword_coverage.map((item: any, idx: number) => (
                        <div key={idx} className="flex items-center gap-3">
                          <span className="w-24 text-sm truncate">{item.skill || item.keyword}</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${item.coverage}%` }} />
                          </div>
                          <span className="text-xs text-gray-500 w-10">{item.coverage}%</span>
                        </div>
                      ))
                    : Object.entries(result.keyword_coverage).map(([skill, coverage]) => (
                        <div key={skill} className="flex items-center gap-3">
                          <span className="w-24 text-sm truncate">{skill}</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${coverage}%` }} />
                          </div>
                          <span className="text-xs text-gray-500 w-10">{coverage}%</span>
                        </div>
                      ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            <div className="bg-white rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Personalized Recommendations</h3>
              <ul className="list-disc list-inside text-sm space-y-1">
                {result.recommendations.map((rec, idx) => <li key={idx}>{rec}</li>)}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="outline" size="md" onClick={() => { setResult(null); setResumeFile(null); setJdText(""); setJdFile(null); }}>
                Analyze Another Match
              </Button>
              <Button variant="primary" size="md" onClick={() => alert("Download feature coming soon.")}>
                Download Report
              </Button>
            </div>
          </div>
        )}
      </div>
    </CandidateLayout>
  );
}
