import { useState } from "react";
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
