import { useState } from "react";
import { CandidateLayout } from "@/components/candidate/layout/CandidateLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/utils/cn";
import { getApiEndpoint, smartFetch } from "@/utils/apiConfig";

interface RoadmapMilestone {
  step: number;
  stage_name: string;
  duration: string;
  key_focus: string;
  skills_to_master: string[];
  action_items: string[];
  suggested_project: string;
}

interface RoadmapResult {
  target_goal: string;
  current_level: string;
  timeline: string;
  overview: string;
  stages: RoadmapMilestone[];
  career_milestones: string[];
}

export default function CareerRoadmapPage() {
  const [targetGoal, setTargetGoal] = useState("Senior Full-Stack Engineer");
  const [currentLevel, setCurrentLevel] = useState("Junior Developer");
  const [timeframe, setTimeframe] = useState("6 Months");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RoadmapResult | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("target_goal", targetGoal);
      form.append("current_level", currentLevel);
      form.append("timeframe", timeframe);

      const res = await smartFetch("/ai/roadmap/generate", {
        method: "POST",
        body: form,
      });

      const json = await res.json();
      if (json.success) {
        setResult(json.data);
      } else {
        setError(json.error?.message || json.detail || "Roadmap generation failed.");
      }
    } catch {
      setError("Could not connect to RakNova AI service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CandidateLayout>
      <Breadcrumb items={[{ label: "AI Career Assistant" }, { label: "AI Career Roadmap" }]} className="mb-4" />
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">AI Career Growth Roadmap</h1>
          <p className="text-sm text-slate-500 mt-1">
            Personalized step-by-step career path, skill milestones, and portfolio project suggestions.
          </p>
        </div>

        {/* Input Form */}
        {!result && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Target Career Goal</label>
                <input
                  type="text"
                  value={targetGoal}
                  onChange={(e) => setTargetGoal(e.target.value)}
                  placeholder="e.g. Lead AI Architect"
                  className="w-full border border-slate-300 rounded-xl p-3 text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Current Background</label>
                <select value={currentLevel} onChange={(e) => setCurrentLevel(e.target.value)} className="w-full border border-slate-300 rounded-xl p-3 text-xs font-medium">
                  <option value="Fresher / Graduate">Fresher / Graduate</option>
                  <option value="Junior Developer">Junior Developer (0-2 yrs)</option>
                  <option value="Mid-Level Engineer">Mid-Level Engineer (2-5 yrs)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Timeline Target</label>
                <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)} className="w-full border border-slate-300 rounded-xl p-3 text-xs font-medium">
                  <option value="3 Months">3 Months (Intensive)</option>
                  <option value="6 Months">6 Months (Standard)</option>
                  <option value="12 Months">12 Months (Comprehensive)</option>
                </select>
              </div>

            </div>

            {error && <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs">{error}</div>}

            <div className="flex justify-center">
              <Button variant="primary" size="lg" loading={loading} onClick={handleGenerate} className="px-8 shadow-md">
                {loading ? "Designing Roadmap..." : "Generate AI Career Roadmap"}
              </Button>
            </div>
          </div>
        )}

        {/* Roadmap Timeline View */}
        {result && (
          <div className="space-y-8">
            
            {/* Summary Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-extrabold text-indigo-400 tracking-wider">Roadmap Strategy</span>
                  <h3 className="text-xl font-bold text-white mt-0.5">{result.target_goal}</h3>
                </div>
                <Badge variant="default" className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold">
                  {result.timeline} Goal
                </Badge>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{result.overview}</p>
            </div>

            {/* Stages Vertical Timeline */}
            <div className="space-y-6">
              {result.stages.map((stage) => (
                <div key={stage.step} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start">
                  
                  {/* Step Badge */}
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-extrabold flex items-center justify-center text-lg shrink-0 shadow-md">
                    {stage.step}
                  </div>

                  {/* Stage Content */}
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h4 className="text-base font-bold text-slate-900">{stage.stage_name}</h4>
                      <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                        {stage.duration}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{stage.key_focus}</p>

                    {/* Skills pills */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Skills to Master:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {stage.skills_to_master.map((sk) => (
                          <Badge key={sk} variant="default" className="bg-slate-100 text-slate-800 text-[11px]">
                            {sk}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Project suggestion */}
                    <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-xs text-emerald-950 font-semibold flex items-center gap-2">
                      <span>💡</span>
                      <span><strong>Stage Project:</strong> {stage.suggested_project}</span>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <Button variant="outline" size="lg" onClick={() => setResult(null)}>
                Generate New Roadmap
              </Button>
            </div>

          </div>
        )}

      </div>
    </CandidateLayout>
  );
}
