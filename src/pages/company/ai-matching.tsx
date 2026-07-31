import { useState } from "react";
import { CompanyLayout } from "@/components/company/layout/CompanyLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/utils/cn";
import { getApiEndpoint, smartFetch } from "@/utils/apiConfig";

interface CandidateMatch {
  candidate_id: string;
  name: string;
  overall_match_score: number;
  skill_match: number;
  experience_match: number;
  education_match: number;
  project_match: number;
  certification_match: number;
  strengths: string[];
  weaknesses: string[];
  missing_skills: string[];
  hiring_recommendation: string;
  ranking_reason: string;
}

export default function CompanyAIMatchingPage() {
  const [jobTitle, setJobTitle] = useState("Senior Full-Stack Engineer");
  const [jobDescription, setJobDescription] = useState(
    "Looking for a Senior Full-Stack Engineer with 3+ years experience in Python, FastAPI, React, PostgreSQL, Docker, and AWS microservices."
  );
  
  const [filterThreshold, setFilterThreshold] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<CandidateMatch[] | null>(null);

  const sampleApplicants = [
    { candidate_id: "c1", name: "Aarav Sharma", resume_text: "Senior Software Engineer with 4 years experience in Python, FastAPI, React, PostgreSQL, Docker, AWS." },
    { candidate_id: "c2", name: "Priya Patel", resume_text: "Frontend Developer with 2 years experience in React, TypeScript, Tailwind, HTML, CSS." },
    { candidate_id: "c3", name: "Rohan Verma", resume_text: "Full Stack Engineer with 3 years experience in Python, Django, React, SQL, Git, Docker." },
    { candidate_id: "c4", name: "Neha Gupta", resume_text: "Backend Developer with 5 years experience in Python, FastAPI, PostgreSQL, Redis, Kubernetes." }
  ];

  const handleMatchCandidates = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        job_title: jobTitle,
        job_description: jobDescription,
        candidates: sampleApplicants,
      };

      const res = await smartFetch("/company/ai/candidate-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.success && json.data?.ranked_candidates) {
        setResults(json.data.ranked_candidates);
      } else {
        setError(json.error?.message || json.detail || "Candidate matching failed.");
      }
    } catch {
      setError("Could not connect to RakNova AI service.");
    } finally {
      setLoading(false);
    }
  };

  const filteredCandidates = (results || []).filter((c) => c.overall_match_score >= filterThreshold);

  return (
    <CompanyLayout>
      <Breadcrumb items={[{ label: "Company Portal" }, { label: "AI Candidate Matching" }]} className="mb-4" />
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">AI Candidate Matching & Ranking</h1>
            <p className="text-sm text-slate-500 mt-1">
              Automatically score and rank applicants against job requirements with explainable AI reasoning.
            </p>
          </div>

          <Button variant="primary" size="lg" loading={loading} onClick={handleMatchCandidates} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md shrink-0">
            ✨ {loading ? "Analyzing Resumes..." : "AI Match Candidates"}
          </Button>
        </div>

        {/* Job Description Setting Input */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Target Job Title</label>
              <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className="w-full border border-slate-300 rounded-xl p-2.5 font-medium" />
            </div>
            <div className="md:col-span-2">
              <label className="font-bold text-slate-700 block mb-1">Job Description Benchmark</label>
              <input type="text" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} className="w-full border border-slate-300 rounded-xl p-2.5 font-medium" />
            </div>
          </div>
        </div>

        {error && <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs">{error}</div>}

        {/* Results View */}
        {results && (
          <div className="space-y-6">
            
            {/* Filter Bar */}
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-500">Filter Threshold:</span>
                {[
                  { label: "All Applicants", val: 0 },
                  { label: "90%+ Match", val: 90 },
                  { label: "80%+ Match", val: 80 },
                  { label: "70%+ Match", val: 70 },
                ].map((btn) => (
                  <button
                    key={btn.val}
                    onClick={() => setFilterThreshold(btn.val)}
                    className={cn(
                      "px-3 py-1.5 rounded-xl font-bold transition-all",
                      filterThreshold === btn.val ? "bg-indigo-600 text-white shadow-xs" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    )}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>

              <span className="font-bold text-slate-500">
                Showing {filteredCandidates.length} of {results.length} Ranked Candidates
              </span>
            </div>

            {/* Top Candidate Spotlight */}
            {results.length > 0 && (
              <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 shadow-md space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 font-extrabold flex items-center justify-center text-xl border border-emerald-500/30">
                      🥇
                    </span>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-400">#1 Top Matched Candidate</span>
                      <h3 className="text-xl font-extrabold text-white">{results[0].name}</h3>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-emerald-400">{results[0].overall_match_score}%</span>
                    <p className="text-[10px] text-slate-300 font-bold uppercase">{results[0].hiring_recommendation}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed border-t border-slate-800 pt-3">
                  <strong>Ranking Reason:</strong> {results[0].ranking_reason}
                </p>
              </div>
            )}

            {/* Ranked Candidates Cards */}
            <div className="space-y-4">
              {filteredCandidates.map((c, idx) => (
                <div key={c.candidate_id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-800 font-extrabold flex items-center justify-center text-xs">
                        #{idx + 1}
                      </span>
                      <div>
                        <h4 className="text-base font-bold text-slate-900">{c.name}</h4>
                        <p className="text-xs text-slate-500">{c.ranking_reason}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge variant="default" className="bg-indigo-50 text-indigo-800 border-indigo-200 font-bold text-xs">
                        {c.hiring_recommendation}
                      </Badge>
                      <span className="text-xl font-extrabold text-indigo-600">{c.overall_match_score}% Match</span>
                    </div>
                  </div>

                  {/* Breakdown Progress Bars */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-3 border-t border-slate-100 text-xs font-medium">
                    <div>
                      <span className="text-slate-500">Skill Match:</span> <strong className="text-slate-900">{c.skill_match}%</strong>
                      <ProgressBar value={c.skill_match} size="sm" color="brand" />
                    </div>
                    <div>
                      <span className="text-slate-500">Experience:</span> <strong className="text-slate-900">{c.experience_match}%</strong>
                      <ProgressBar value={c.experience_match} size="sm" color="brand" />
                    </div>
                    <div>
                      <span className="text-slate-500">Education:</span> <strong className="text-slate-900">{c.education_match}%</strong>
                      <ProgressBar value={c.education_match} size="sm" color="brand" />
                    </div>
                    <div>
                      <span className="text-slate-500">Projects:</span> <strong className="text-slate-900">{c.project_match}%</strong>
                      <ProgressBar value={c.project_match} size="sm" color="brand" />
                    </div>
                    <div>
                      <span className="text-slate-500">Certifications:</span> <strong className="text-slate-900">{c.certification_match}%</strong>
                      <ProgressBar value={c.certification_match} size="sm" color="brand" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </CompanyLayout>
  );
}
