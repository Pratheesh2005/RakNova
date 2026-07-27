import { useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { CandidateLayout } from "@/components/candidate/layout/CandidateLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { AssistantHero } from "@/components/candidate/assistant/AssistantHero";
import { AssistantCards } from "@/components/candidate/assistant/AssistantCards";
import { ChatWorkspace } from "@/components/candidate/assistant/ChatWorkspace";
import { QuickActions } from "@/components/candidate/assistant/QuickActions";
import { CareerHealthReport } from "@/components/candidate/assistant/CareerHealthReport";
import { TodayRecommendations } from "@/components/candidate/assistant/TodayRecommendations";
import { LearningRoadmap } from "@/components/candidate/assistant/LearningRoadmap";
import { SuggestedQuestions } from "@/components/candidate/assistant/SuggestedQuestions";
import { CareerInsights } from "@/components/candidate/assistant/CareerInsights";
import { WeeklyGoals } from "@/components/candidate/assistant/WeeklyGoals";
import { KnowledgeLibrary } from "@/components/candidate/assistant/KnowledgeLibrary";
import { SavedConversations } from "@/components/candidate/assistant/SavedConversations";
import { AssistantHistory } from "@/components/candidate/assistant/AssistantHistory";
import { AIAchievements } from "@/components/candidate/assistant/AIAchievements";
import { FutureAIFeatures } from "@/components/candidate/assistant/FutureAIFeatures";
import { assistants, AssistantType } from "@/data/candidate/assistant";

export default function AIAssistantPage() {
  const [activeAssistant, setActiveAssistant] = useState<AssistantType | null>(null);
  const [activePrompt, setActivePrompt] = useState<string>("");

  const handleLaunch = (assistant: AssistantType, prompt?: string) => {
    setActiveAssistant(assistant);
    setActivePrompt(prompt || "");
  };

  const handleClose = () => {
    setActiveAssistant(null);
    setActivePrompt("");
  };

  return (
    <CandidateLayout>
      <Breadcrumb items={[{ label: "AI Career Assistant" }]} className="mb-4" />

      {/* Chat Workspace Overlay */}
      <AnimatePresence>
        {activeAssistant && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="w-full max-w-4xl h-[85vh]">
              <ChatWorkspace assistant={activeAssistant} onClose={handleClose} />
            </div>
          </div>
        )}
      </AnimatePresence>

      <div className="space-y-6">
        {/* Hero */}
        <AssistantHero />

        {/* Executive AI Dashboard Link Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 font-extrabold flex items-center justify-center text-2xl border border-indigo-500/30">
              📊
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Executive AI Career Dashboard</h3>
              <p className="text-xs text-slate-300">Unified overview of your ATS resume score, interview readiness, skill gaps, and roadmap.</p>
            </div>
          </div>
          <Link href="/candidate/ai-assistant/ai-dashboard">
            <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shrink-0">
              View Executive Dashboard &rarr;
            </button>
          </Link>
        </div>

        {/* Resume Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/candidate/ai-assistant/resume-analyzer">
            <div className="bg-white rounded-2xl border border-blue-200 p-5 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between h-full space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl shrink-0">📄</div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">AI Resume Analyzer</h3>
                  <p className="text-xs text-gray-500 mt-0.5">ATS score & structural audit.</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-blue-600 flex items-center gap-1">Analyze &rarr;</span>
            </div>
          </Link>

          <Link href="/candidate/ai-assistant/ats-optimizer">
            <div className="bg-white rounded-2xl border border-emerald-200 p-5 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between h-full space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-xl shrink-0">⚡</div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">ATS Resume Optimizer</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Bullet rewriter & keyword heatmap.</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">Optimize &rarr;</span>
            </div>
          </Link>

          <Link href="/candidate/ai-assistant/job-match-analyzer">
            <div className="bg-white rounded-2xl border border-purple-200 p-5 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between h-full space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-xl shrink-0">🎯</div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">Job Match Analyzer</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Job description fit comparison.</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-purple-600 flex items-center gap-1">Match &rarr;</span>
            </div>
          </Link>

          <Link href="/candidate/ai-assistant/interview-assistant">
            <div className="bg-white rounded-2xl border border-indigo-200 p-5 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between h-full space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-xl shrink-0">🎙️</div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">Interview Assistant</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Mock interview & STAR report.</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-indigo-600 flex items-center gap-1">Practice &rarr;</span>
            </div>
          </Link>
        </div>

        {/* Main Assistant Cards */}
        <AssistantCards onLaunch={(a) => handleLaunch(a)} />

        {/* Quick Actions */}
        <QuickActions onAction={(a, p) => handleLaunch(a, p)} assistants={assistants} />

        {/* Career Health Report */}
        <CareerHealthReport />

        {/* Grid: Today's Recs + Career Insights */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TodayRecommendations />
          </div>
          <div>
            <CareerInsights />
          </div>
        </div>

        {/* Learning Roadmap */}
        <LearningRoadmap />

        {/* Suggested Questions + Weekly Goals */}
        <div className="grid lg:grid-cols-2 gap-6">
          <SuggestedQuestions onAsk={(q) => handleLaunch(assistants[0], q)} />
          <WeeklyGoals />
        </div>

        {/* Knowledge Library */}
        <KnowledgeLibrary />

        {/* Saved Conversations + History */}
        <div className="grid lg:grid-cols-2 gap-6">
          <SavedConversations />
          <AssistantHistory />
        </div>

        {/* Achievements */}
        <AIAchievements />

        {/* Future AI Features */}
        <FutureAIFeatures />
      </div>
    </CandidateLayout>
  );
}
