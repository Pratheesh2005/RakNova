import { useState, useEffect } from "react";
import { CandidateLayout } from "@/components/candidate/layout/CandidateLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/utils/cn";
import { getApiEndpoint, smartFetch } from "@/utils/apiConfig";
import { getFallbackInterviewQuestions, getFallbackInterviewEvaluation } from "@/utils/aiFallbackData";

interface Question {
  id: number;
  question: string;
  category: string;
  difficulty: string;
  ideal_answer: string;
}

interface Report {
  overall_score: number;
  technical_score: number;
  behavioral_score: number;
  communication_score: number;
  problem_solving: number;
  confidence: number;
  star_method_score: number;
  strengths: string[];
  weaknesses: string[];
  mistakes: string[];
  areas_to_improve: string[];
  ideal_answers: string[];
  improved_answers: string[];
  learning_resources: string[];
  interview_readiness: number;
  hiring_probability: number;
}

export default function InterviewAssistantPage() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [interviewType, setInterviewType] = useState("Technical");
  const [difficulty, setDifficulty] = useState("Medium");
  const [experience, setExperience] = useState("Fresher");
  const [numQuestions, setNumQuestions] = useState(5);
  const [language, setLanguage] = useState("English");
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<Report | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [timerSeconds, setTimerSeconds] = useState(120);
  const [phase, setPhase] = useState<"setup" | "interview" | "report">("setup");

  // Timer effect during interview phase
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (phase === "interview" && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [phase, timerSeconds]);

  const handleFile = (file: File) => {
    if (!file.type.includes("pdf") && !file.type.includes("docx")) {
      setError("Resume must be PDF or DOCX format.");
      return;
    }
    setResumeFile(file);
    setError(null);
  };

  const startInterview = async () => {
    if (!resumeFile) return;
    setLoading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("resume", resumeFile);
      form.append("job_description", jobDescription);
      form.append("interview_type", interviewType);
      form.append("difficulty", difficulty);
      form.append("experience", experience);
      form.append("num_questions", String(numQuestions));
      form.append("language", language);

      let res: Response | null = null;
      try {
        res = await smartFetch("/ai/interview/questions", {
          method: "POST",
          body: form,
        });
      } catch {
        console.warn("Backend API unreachable, using client-side interview questions fallback.");
      }

      if (res && res.ok) {
        const json = await res.json();
        if (json.success && json.data?.questions) {
          setQuestions(json.data.questions);
          setCurrentIdx(0);
          setAnswers({});
          setTimerSeconds(120);
          setPhase("interview");
          return;
        }
      }

      setQuestions(getFallbackInterviewQuestions(interviewType) as any);
      setCurrentIdx(0);
      setAnswers({});
      setTimerSeconds(120);
      setPhase("interview");
    } catch {
      setQuestions(getFallbackInterviewQuestions(interviewType) as any);
      setCurrentIdx(0);
      setAnswers({});
      setTimerSeconds(120);
      setPhase("interview");
    } finally {
      setLoading(false);
    }
  };

  const finishInterview = async () => {
    setLoading(true);
    setError(null);
    try {
      const qaList = questions.map((q) => ({
        id: q.id,
        question: q.question,
        answer: answers[q.id] || "(No answer provided)",
      }));

      const form = new FormData();
      form.append("resume_text", resumeFile ? resumeFile.name : "Resume Context");
      form.append("interview_type", interviewType);
      form.append("difficulty", difficulty);
      form.append("questions_and_answers", JSON.stringify(qaList));

      let res: Response | null = null;
      try {
        res = await smartFetch("/ai/interview/evaluate", {
          method: "POST",
          body: form,
        });
      } catch {
        console.warn("Backend API unreachable, using client-side evaluation fallback.");
      }

      if (res && res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setReport(json.data);
          setPhase("report");
          return;
        }
      }

      setReport(getFallbackInterviewEvaluation() as any);
      setPhase("report");
    } catch {
      setReport(getFallbackInterviewEvaluation() as any);
      setPhase("report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CandidateLayout>
      <Breadcrumb items={[{ label: "AI Career Assistant" }, { label: "AI Interview Assistant" }]} className="mb-4" />
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">AI Mock Interview Assistant</h1>
          <p className="text-sm text-slate-500 mt-1">
            Simulate real technical, behavioral, and HR interviews tailored to your target job role.
          </p>
        </div>

        {/* Phase 1: Setup Form */}
        {phase === "setup" && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Resume Upload */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-800">1. Upload Resume (PDF / DOCX)</label>
                <div className="border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-2xl p-6 text-center transition-all bg-slate-50/50">
                  {resumeFile ? (
                    <div>
                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-2 text-emerald-600 font-bold text-xl">
                        ✓
                      </div>
                      <p className="text-sm font-bold text-slate-900">{resumeFile.name}</p>
                      <button onClick={() => setResumeFile(null)} className="mt-2 text-xs font-semibold text-rose-600 hover:underline">
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs text-slate-500 mb-3">Drop resume here or</p>
                      <label className="inline-block cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs">
                        Browse Resume
                        <input type="file" accept=".pdf,.docx" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Settings */}
              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-800">2. Interview Configuration</label>
                
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="font-semibold text-slate-600">Interview Type</span>
                    <select value={interviewType} onChange={(e) => setInterviewType(e.target.value)} className="w-full mt-1 border border-slate-300 rounded-xl p-2 font-medium">
                      <option value="Technical">Technical & Coding</option>
                      <option value="Behavioral">Behavioral (STAR)</option>
                      <option value="HR">HR & Cultural Fit</option>
                    </select>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-600">Difficulty</span>
                    <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full mt-1 border border-slate-300 rounded-xl p-2 font-medium">
                      <option value="Easy">Easy / Entry</option>
                      <option value="Medium">Medium / Standard</option>
                      <option value="Hard">Hard / Senior</option>
                    </select>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-600">Experience Level</span>
                    <select value={experience} onChange={(e) => setExperience(e.target.value)} className="w-full mt-1 border border-slate-300 rounded-xl p-2 font-medium">
                      <option value="Fresher">Fresher (0-1 yr)</option>
                      <option value="Mid">Mid-Level (2-4 yrs)</option>
                      <option value="Senior">Senior (5+ yrs)</option>
                    </select>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-600">Questions Count</span>
                    <select value={numQuestions} onChange={(e) => setNumQuestions(Number(e.target.value))} className="w-full mt-1 border border-slate-300 rounded-xl p-2 font-medium">
                      <option value={5}>5 Questions</option>
                      <option value={10}>10 Questions</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Optional Job Description */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-800">3. Target Job Description (Optional)</label>
              <textarea
                rows={3}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste job requirements here for role-specific interview questions..."
                className="w-full border border-slate-300 rounded-2xl p-3 text-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {error && <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs">{error}</div>}

            <div className="flex justify-center">
              <Button variant="primary" size="lg" loading={loading} disabled={!resumeFile || loading} onClick={startInterview} className="px-8 shadow-md">
                {loading ? "Generating Questions..." : "Start AI Mock Interview"}
              </Button>
            </div>
          </div>
        )}

        {/* Phase 2: Live Interview Session */}
        {phase === "interview" && questions.length > 0 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
            
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-bold">
                  Question {currentIdx + 1} of {questions.length}
                </span>
                <Badge variant="default" className="bg-purple-50 text-purple-700 border-purple-200">
                  {questions[currentIdx].category.toUpperCase()}
                </Badge>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl">
                <span>⏱ Timer:</span>
                <span className={cn(timerSeconds < 30 ? "text-rose-600 font-extrabold animate-pulse" : "text-slate-900")}>
                  {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Question Box */}
            <div className="p-6 bg-slate-900 text-white rounded-2xl space-y-2 shadow-sm">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-indigo-400">Interviewer Asks:</span>
              <h3 className="text-lg font-bold text-white leading-relaxed">{questions[currentIdx].question}</h3>
            </div>

            {/* Answer Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                <span>Your Answer Response:</span>
                <span className="text-slate-400">STAR Method recommended</span>
              </div>
              <textarea
                rows={6}
                value={answers[questions[currentIdx].id] || ""}
                onChange={(e) => setAnswers({ ...answers, [questions[currentIdx].id]: e.target.value })}
                placeholder="Type your response here. Explain your situation, action taken, and achieved result..."
                className="w-full border border-slate-300 rounded-2xl p-4 text-xs focus:ring-2 focus:ring-indigo-500 leading-relaxed"
              />
            </div>

            {/* Nav Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <Button
                variant="outline"
                size="md"
                disabled={currentIdx === 0}
                onClick={() => { setCurrentIdx(currentIdx - 1); setTimerSeconds(120); }}
              >
                ← Previous
              </Button>

              {currentIdx < questions.length - 1 ? (
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => { setCurrentIdx(currentIdx + 1); setTimerSeconds(120); }}
                >
                  Next Question →
                </Button>
              ) : (
                <Button variant="primary" size="md" loading={loading} onClick={finishInterview} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  Finish & Get Evaluation Report
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Phase 3: Evaluation Report */}
        {phase === "report" && report && (
          <div className="space-y-8">
            
            {/* Top Score Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-32 h-32 mb-3">
                  <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                    <circle cx="60" cy="60" r="52" fill="none" stroke="#10b981" strokeWidth="10" strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 52}`}
                      strokeDashoffset={`${2 * Math.PI * 52 * (1 - report.overall_score / 100)}`} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-extrabold text-slate-900">{report.overall_score}%</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Overall</span>
                  </div>
                </div>
                <Badge variant="default" className="bg-emerald-50 text-emerald-700 border-emerald-200 font-bold">
                  {report.overall_score >= 80 ? "Hire Recommended" : "Needs Improvement"}
                </Badge>
              </div>

              <div className="md:col-span-2 space-y-3">
                <h3 className="text-lg font-bold text-slate-900">Performance Breakdown</h3>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs">
                  {[
                    { label: "Technical Competency", val: report.technical_score },
                    { label: "Behavioral Alignment", val: report.behavioral_score },
                    { label: "Communication Clarity", val: report.communication_score },
                    { label: "Problem Solving", val: report.problem_solving },
                    { label: "Confidence Rating", val: report.confidence },
                    { label: "STAR Method Usage", val: report.star_method_score },
                  ].map((m) => (
                    <div key={m.label} className="space-y-1">
                      <div className="flex justify-between font-semibold">
                        <span className="text-slate-600">{m.label}</span>
                        <span className="text-slate-900 font-bold">{m.val}%</span>
                      </div>
                      <ProgressBar value={m.val} size="sm" color="brand" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3 shadow-sm">
                <h4 className="font-bold text-emerald-800 text-base flex items-center gap-2">
                  <span>✓</span> Key Interview Strengths
                </h4>
                <ul className="list-disc list-inside text-xs text-slate-700 space-y-2">
                  {report.strengths.map((s, idx) => <li key={idx}>{s}</li>)}
                </ul>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3 shadow-sm">
                <h4 className="font-bold text-amber-800 text-base flex items-center gap-2">
                  <span>⚠️</span> Areas to Improve
                </h4>
                <ul className="list-disc list-inside text-xs text-slate-700 space-y-2">
                  {report.areas_to_improve.map((a, idx) => <li key={idx}>{a}</li>)}
                </ul>
              </div>
            </div>

            {/* Ideal Answer Recommendations */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm">
              <h4 className="font-bold text-slate-900 text-base">Expert Answer Enhancements</h4>
              <div className="space-y-3 text-xs">
                {report.ideal_answers.map((ans, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                    <p className="font-bold text-indigo-700">Recommendation {idx + 1}:</p>
                    <p className="text-slate-800 leading-relaxed">{ans}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-4">
              <Button variant="outline" size="lg" onClick={() => { setPhase("setup"); setQuestions([]); setReport(null); }}>
                Start Another Mock Interview
              </Button>
            </div>

          </div>
        )}

      </div>
    </CandidateLayout>
  );
}
