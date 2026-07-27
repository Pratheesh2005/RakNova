import Link from "next/link";
import { CandidateLayout } from "@/components/candidate/layout/CandidateLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

export default function AIDashboardPage() {
  const tools = [
    {
      title: "AI Resume Analyzer",
      desc: "Instant ATS score, parsing check, and structural feedback.",
      link: "/candidate/ai-assistant/resume-analyzer",
      icon: "📄",
      color: "border-blue-200 bg-blue-50/30 text-blue-600",
      badge: "ATS Benchmark"
    },
    {
      title: "ATS Resume Optimizer",
      desc: "Enterprise bullet rewriter, keyword heatmap, and zero fake-data guarantee.",
      link: "/candidate/ai-assistant/ats-optimizer",
      icon: "⚡",
      color: "border-emerald-200 bg-emerald-50/30 text-emerald-600",
      badge: "SaaS Enterprise"
    },
    {
      title: "Job Match Analyzer",
      desc: "Compare resume against specific job descriptions with match score.",
      link: "/candidate/ai-assistant/job-match-analyzer",
      icon: "🎯",
      color: "border-purple-200 bg-purple-50/30 text-purple-600",
      badge: "Match Engine"
    },
    {
      title: "AI Interview Assistant",
      desc: "Simulate role-specific mock interviews with live timing and STAR evaluation.",
      link: "/candidate/ai-assistant/interview-assistant",
      icon: "🎙️",
      color: "border-indigo-200 bg-indigo-50/30 text-indigo-600",
      badge: "Mock Simulator"
    },
    {
      title: "Skill Gap Analyzer",
      desc: "Identify missing technical competencies for target industry roles.",
      link: "/candidate/ai-assistant/skill-gap-analyzer",
      icon: "📊",
      color: "border-amber-200 bg-amber-50/30 text-amber-600",
      badge: "Skill Roadmap"
    },
    {
      title: "AI Career Roadmap",
      desc: "Customized step-by-step career path, milestones, and portfolio projects.",
      link: "/candidate/ai-assistant/career-roadmap",
      icon: "🗺️",
      color: "border-cyan-200 bg-cyan-50/30 text-cyan-600",
      badge: "Growth Plan"
    },
    {
      title: "Cover Letter Generator",
      desc: "Craft tailored, executive cover letters for specific job applications.",
      link: "/candidate/ai-assistant/cover-letter-generator",
      icon: "✉️",
      color: "border-rose-200 bg-rose-50/30 text-rose-600",
      badge: "Application Generator"
    },
    {
      title: "AI Career Coach Chat",
      desc: "Real-time AI consultation for career strategy, code reviews, and negotiation.",
      link: "/candidate/ai-assistant/ai-chat",
      icon: "💬",
      color: "border-slate-300 bg-slate-100 text-slate-800",
      badge: "24/7 AI Coach"
    }
  ];

  return (
    <CandidateLayout>
      <Breadcrumb items={[{ label: "AI Career Assistant" }, { label: "Executive AI Dashboard" }]} className="mb-4" />
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Executive AI Career Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">
              Unified intelligence hub for ATS optimization, job matching, mock interviews, and skill progression.
            </p>
          </div>

          <Badge variant="default" className="bg-indigo-50 text-indigo-700 border-indigo-200 px-3 py-1 text-xs font-bold">
            ✨ RakNova AI Engine v1.0 Active
          </Badge>
        </div>

        {/* Executive Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">ATS Resume Score</p>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-extrabold text-emerald-600">88%</span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">+30 pts</span>
            </div>
            <ProgressBar value={88} size="sm" color="brand" />
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Interview Probability</p>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-extrabold text-indigo-600">84%</span>
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">High Fit</span>
            </div>
            <ProgressBar value={84} size="sm" color="brand" />
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Job Match Rating</p>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-extrabold text-purple-600">83%</span>
              <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">Good Match</span>
            </div>
            <ProgressBar value={83} size="sm" color="brand" />
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Skill Gap Readiness</p>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-extrabold text-amber-600">76%</span>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">3 Gaps</span>
            </div>
            <ProgressBar value={76} size="sm" color="brand" />
          </div>
        </div>

        {/* AI Tools Navigation Grid */}
        <div className="space-y-4">
          <h3 className="text-xl font-extrabold text-slate-900">RakNova AI Assistant Tools</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tools.map((t) => (
              <Link key={t.title} href={t.link}>
                <div className={cn("rounded-3xl border p-6 hover:shadow-md transition-all cursor-pointer h-full flex flex-col justify-between space-y-4", t.color)}>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{t.icon}</span>
                      <span className="text-[10px] uppercase font-extrabold tracking-wider opacity-70 px-2 py-0.5 rounded-md border border-current">
                        {t.badge}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900">{t.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{t.desc}</p>
                  </div>

                  <div className="text-xs font-bold text-indigo-700 flex items-center gap-1">
                    Launch Assistant &rarr;
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Actionable Recommendations Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              💡 Recommended Next Step
            </h4>
            <p className="text-xs text-slate-300">
              Your ATS Resume score is 88%. Try running a <strong className="text-indigo-300">Job Match Analysis</strong> against your target company's job posting to verify keyword coverage.
            </p>
          </div>

          <Link href="/candidate/ai-assistant/job-match-analyzer">
            <Button variant="primary" size="md" className="bg-indigo-600 hover:bg-indigo-700 text-white shrink-0">
              Run Job Match &rarr;
            </Button>
          </Link>
        </div>

      </div>
    </CandidateLayout>
  );
}
