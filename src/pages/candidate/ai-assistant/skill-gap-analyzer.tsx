import { useState } from "react";
import { CandidateLayout } from "@/components/candidate/layout/CandidateLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/utils/cn";

interface SkillGapResult {
  current_skills: string[];
  missing_skills: string[];
  critical_skills: string[];
  nice_to_have_skills: string[];
  learning_difficulty: { skill: string; difficulty: string }[];
  estimated_time: { skill: string; time_estimate: string }[];
  learning_cost: { skill: string; cost: string }[];
  beginner_roadmap: string[];
  intermediate_roadmap: string[];
  advanced_roadmap: string[];
  recommended_certifications: string[];
  recommended_courses: string[];
  projects_to_build: string[];
  github_ideas: string[];
  industry_trends: string[];
  future_demand: string[];
  market_demand: string[];
  salary_impact: string;
}

export default function SkillGapAnalyzerPage() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [targetRole, setTargetRole] = useState("Full-Stack Software Engineer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SkillGapResult | null>(null);

  const handleAnalyze = async () => {
    if (!resumeFile) return;
    setLoading(true);
    setError(null);

    try {
      const form = new FormData();
      form.append("resume", resumeFile);
      form.append("target_role", targetRole);

      let res: Response | null = null;
      try {
        res = await fetch("http://localhost:8000/api/v1/ai/skill-gap/analyze", {
          method: "POST",
          body: form,
        });
      } catch {
        res = await fetch("http://127.0.0.1:8000/api/v1/ai/skill-gap/analyze", {
          method: "POST",
          body: form,
        });
      }

      const json = await res.json();
      if (json.success) {
        setResult(json.data);
      } else {
        setError(json.error?.message || json.detail || "Skill gap analysis failed.");
      }
    } catch {
      setError("Could not connect to RakNova AI service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CandidateLayout>
      <Breadcrumb items={[{ label: "AI Career Assistant" }, { label: "Skill Gap Analyzer" }]} className="mb-4" />
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Title */}
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">AI Skill Gap Analyzer</h1>
          <p className="text-sm text-slate-500 mt-1">
            Comprehensive skill analysis, roadmaps, certifications, and market demand insights.
          </p>
        </div>

        {/* Input Form */}
        {!result && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* File Upload */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-800">1. Upload Current Resume</label>
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
                      <p className="text-xs text-slate-500 mb-3">PDF or DOCX file</p>
                      <label className="inline-block cursor-pointer bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs">
                        Browse Resume
                        <input type="file" accept=".pdf,.docx" className="hidden" onChange={(e) => e.target.files?.[0] && setResumeFile(e.target.files[0])} />
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Target Role */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-800">2. Target Role / Job Title</label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Senior Full-Stack Engineer, DevOps Specialist..."
                  className="w-full border border-slate-300 rounded-2xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 font-medium"
                />
                <p className="text-xs text-slate-400">Specify your desired career transition or job title.</p>
              </div>

            </div>

            {error && <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs">{error}</div>}

            <div className="flex justify-center">
              <Button variant="primary" size="lg" loading={loading} disabled={!resumeFile || loading} onClick={handleAnalyze} className="px-8 shadow-md">
                {loading ? "Analyzing Skill Gaps..." : "Analyze Skill Gaps"}
              </Button>
            </div>
          </div>
        )}

        {/* Results View */}
        {result && (
          <div className="space-y-8">
            
            {/* Top Salary Impact Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 shadow-md flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-indigo-400">Target Role Impact</span>
                <h3 className="text-xl font-extrabold text-white mt-0.5">{targetRole}</h3>
              </div>
              <div className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl text-emerald-300 font-extrabold text-sm">
                💰 {result.salary_impact}
              </div>
            </div>

            {/* Current vs Missing Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span className="text-emerald-600">✓</span> Validated Current Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.current_skills.map((s) => (
                    <Badge key={s} variant="default" className="bg-emerald-50 text-emerald-800 border-emerald-200">
                      ✓ {s}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span className="text-rose-600">⚡</span> Critical Missing Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.critical_skills.map((s) => (
                    <Badge key={s} variant="default" className="bg-rose-50 text-rose-800 border-rose-200 font-bold">
                      🔴 {s}
                    </Badge>
                  ))}
                  {result.nice_to_have_skills.map((s) => (
                    <Badge key={s} variant="default" className="bg-amber-50 text-amber-800 border-amber-200">
                      🟡 {s}
                    </Badge>
                  ))}
                </div>
              </div>

            </div>

            {/* Beginner, Intermediate, Advanced Roadmaps */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Learning Roadmap Phases</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <span className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full font-bold text-[10px] uppercase">
                    Phase 1: Beginner
                  </span>
                  <ul className="list-disc list-inside space-y-1.5 text-slate-700 font-medium">
                    {result.beginner_roadmap.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <span className="px-2.5 py-1 bg-purple-100 text-purple-800 rounded-full font-bold text-[10px] uppercase">
                    Phase 2: Intermediate
                  </span>
                  <ul className="list-disc list-inside space-y-1.5 text-slate-700 font-medium">
                    {result.intermediate_roadmap.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <span className="px-2.5 py-1 bg-indigo-100 text-indigo-800 rounded-full font-bold text-[10px] uppercase">
                    Phase 3: Advanced
                  </span>
                  <ul className="list-disc list-inside space-y-1.5 text-slate-700 font-medium">
                    {result.advanced_roadmap.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>

              </div>
            </div>

            {/* Recommended Certifications & Projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3 shadow-sm">
                <h3 className="text-base font-bold text-slate-900">🎓 Recommended Certifications</h3>
                <ul className="space-y-2 text-xs">
                  {result.recommended_certifications.map((c, i) => (
                    <li key={i} className="p-3 bg-purple-50/60 rounded-xl border border-purple-100 text-purple-950 font-semibold">
                      🏆 {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3 shadow-sm">
                <h3 className="text-base font-bold text-slate-900">💻 Recommended Portfolio Projects</h3>
                <ul className="space-y-2 text-xs">
                  {result.projects_to_build.map((p, i) => (
                    <li key={i} className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 text-indigo-950 font-semibold">
                      🚀 {p}
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            <div className="flex justify-center">
              <Button variant="outline" size="lg" onClick={() => setResult(null)}>
                Analyze Another Role
              </Button>
            </div>

          </div>
        )}

      </div>
    </CandidateLayout>
  );
}
