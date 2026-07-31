import { useState } from "react";
import { CompanyLayout } from "@/components/company/layout/CompanyLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/utils/cn";
import { getApiEndpoint } from "@/utils/apiConfig";

interface Question {
  id: number;
  question: string;
  category: string;
  difficulty: string;
  expected_answer: string;
  evaluation_criteria: string[];
  follow_up_question: string;
}

interface InterviewGuide {
  candidate_name: string;
  job_title: string;
  interview_type: string;
  difficulty: string;
  questions: Question[];
  interview_guide_summary: string;
}

export default function RecruiterInterviewPage() {
  const [candidateName, setCandidateName] = useState("Aarav Sharma");
  const [jobTitle, setJobTitle] = useState("Senior Full-Stack Engineer");
  const [jobDescription, setJobDescription] = useState(
    "Looking for a Senior Full-Stack Engineer with 3+ years experience in Python, FastAPI, React, PostgreSQL, Docker, and AWS."
  );
  const [resumeText, setResumeText] = useState(
    "Aarav Sharma - Senior Software Engineer with 4 years experience building web applications using Python, FastAPI, React, PostgreSQL, and Docker."
  );
  const [interviewType, setInterviewType] = useState("Mixed");
  const [difficulty, setDifficulty] = useState("Medium");
  const [experienceLevel, setExperienceLevel] = useState("Mid-Level");
  const [numQuestions, setNumQuestions] = useState(5);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [guide, setGuide] = useState<InterviewGuide | null>(null);

  const handleGenerateQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        candidate_name: candidateName,
        job_title: jobTitle,
        job_description: jobDescription,
        resume_text: resumeText,
        experience_level: experienceLevel,
        difficulty: difficulty,
        interview_type: interviewType,
        num_questions: numQuestions,
      };

      const endpoint = getApiEndpoint("/company/ai/interview-generator");
      let res: Response | null = null;
      try {
        res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch {
        res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const json = await res.json();
      if (json.success && json.data) {
        setGuide(json.data);
      } else {
        setError(json.error?.message || json.detail || "Interview generation failed.");
      }
    } catch {
      setError("Could not connect to RakNova AI service.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <CompanyLayout>
      <Breadcrumb items={[{ label: "Company Portal" }, { label: "AI Interview Generator" }]} className="mb-4" />
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">AI Recruiter Interview Generator</h1>
            <p className="text-sm text-slate-500 mt-1">
              Generate candidate-specific technical, behavioral, HR, and scenario questions with expected answers and evaluation criteria.
            </p>
          </div>

          <Button variant="primary" size="lg" loading={loading} onClick={handleGenerateQuestions} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md shrink-0">
            ✨ {loading ? "Generating Questions..." : "Generate AI Interview"}
          </Button>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Candidate Name</label>
              <input type="text" value={candidateName} onChange={(e) => setCandidateName(e.target.value)} className="w-full border border-slate-300 rounded-xl p-2.5 font-medium" />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Target Job Title</label>
              <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className="w-full border border-slate-300 rounded-xl p-2.5 font-medium" />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Interview Type</label>
              <select value={interviewType} onChange={(e) => setInterviewType(e.target.value)} className="w-full border border-slate-300 rounded-xl p-2.5 font-medium">
                <option value="Mixed">Mixed (Technical + Behavioral + HR)</option>
                <option value="Technical">Technical & Coding Only</option>
                <option value="Behavioral">Behavioral (STAR Method)</option>
                <option value="HR">HR & Cultural Fit</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Job Description Context</label>
              <textarea rows={3} value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} className="w-full border border-slate-300 rounded-xl p-2 font-mono" />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Candidate Resume Summary</label>
              <textarea rows={3} value={resumeText} onChange={(e) => setResumeText(e.target.value)} className="w-full border border-slate-300 rounded-xl p-2 font-mono" />
            </div>
          </div>
        </div>

        {error && <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs">{error}</div>}

        {/* Results View */}
        {guide && (
          <div className="space-y-6">
            
            {/* Summary Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 shadow-md flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-indigo-400">Recruiter Interview Guide</span>
                <h3 className="text-xl font-extrabold text-white mt-0.5">{guide.candidate_name} — {guide.job_title}</h3>
                <p className="text-xs text-slate-300 mt-1">{guide.interview_guide_summary}</p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => copyToClipboard(JSON.stringify(guide, null, 2))} className="bg-white/10 text-white border-white/20 text-xs">
                  📋 Copy Guide
                </Button>
                <Button variant="primary" size="sm" onClick={handleGenerateQuestions} className="bg-emerald-600 text-white text-xs">
                  🔄 Regenerate
                </Button>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {guide.questions.map((q) => (
                <div key={q.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-extrabold flex items-center justify-center text-[10px]">
                        Q{q.id}
                      </span>
                      <Badge variant="default" className="bg-indigo-50 text-indigo-800 border-indigo-200 font-bold">
                        {q.category}
                      </Badge>
                      <Badge variant="default" className="bg-slate-100 text-slate-700">
                        {q.difficulty}
                      </Badge>
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-slate-900">{q.question}</h4>

                  {/* Expected Answer */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-700">Expected Key Concepts:</span>
                    <p className="text-slate-600 leading-relaxed">{q.expected_answer}</p>
                  </div>

                  {/* Evaluation Criteria & Follow up */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 space-y-1">
                      <span className="font-bold text-emerald-800">Scoring Criteria:</span>
                      <ul className="list-disc list-inside text-emerald-950 font-medium">
                        {q.evaluation_criteria.map((c, i) => <li key={i}>{c}</li>)}
                      </ul>
                    </div>

                    <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100 space-y-1">
                      <span className="font-bold text-purple-800">Probing Follow-Up:</span>
                      <p className="text-purple-950 font-medium">{q.follow_up_question}</p>
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
