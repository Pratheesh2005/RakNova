import { CandidateLayout } from "@/components/candidate/layout/CandidateLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SkillsHero } from "@/components/candidate/skills/SkillsHero";
import { AIEmployabilityScore } from "@/components/candidate/skills/AIEmployabilityScore";
import { SkillsMatrix } from "@/components/candidate/skills/SkillsMatrix";
import { SkillGapAnalysis } from "@/components/candidate/skills/SkillGapAnalysis";
import { MarketDemandAnalysis } from "@/components/candidate/skills/MarketDemandAnalysis";
import { CareerRoadmap } from "@/components/candidate/skills/CareerRoadmap";
import { LearningRecommendations } from "@/components/candidate/skills/LearningRecommendations";
import { AICareerPrediction } from "@/components/candidate/skills/AICareerPrediction";
import { SalaryInsights } from "@/components/candidate/skills/SalaryInsights";
import { IndustryDemand } from "@/components/candidate/skills/IndustryDemand";
import { ProjectStrengthAnalysis } from "@/components/candidate/skills/ProjectStrengthAnalysis";
import { CertificationTracker } from "@/components/candidate/skills/CertificationTracker";
import { AIWeeklyChallenge } from "@/components/candidate/skills/AIWeeklyChallenge";
import { CareerMilestones } from "@/components/candidate/skills/CareerMilestones";
import { AIInsightsPanel } from "@/components/candidate/skills/AIInsightsPanel";
import { FutureAISkillsFeatures } from "@/components/candidate/skills/FutureAISkillsFeatures";

export default function SkillAnalyticsPage() {
  return (
    <CandidateLayout>
      <Breadcrumb items={[{ label: "Skill Analytics" }]} className="mb-4" />

      <div className="space-y-6">
        {/* Hero */}
        <SkillsHero />

        {/* Top Grid: Employability + Career Prediction */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <AIEmployabilityScore />
          </div>
          <div className="lg:col-span-2">
            <AICareerPrediction />
          </div>
        </div>

        {/* Skills Matrix */}
        <SkillsMatrix />

        {/* Skill Gap Analysis */}
        <SkillGapAnalysis />

        {/* Market + Salary */}
        <div className="grid lg:grid-cols-2 gap-6">
          <MarketDemandAnalysis />
          <SalaryInsights />
        </div>

        {/* Industry Demand + Career Roadmap */}
        <div className="grid lg:grid-cols-2 gap-6">
          <IndustryDemand />
          <CareerRoadmap />
        </div>

        {/* Learning Recommendations */}
        <LearningRecommendations />

        {/* Projects + Certifications */}
        <div className="grid lg:grid-cols-2 gap-6">
          <ProjectStrengthAnalysis />
          <CertificationTracker />
        </div>

        {/* Weekly Challenge */}
        <AIWeeklyChallenge />

        {/* Milestones */}
        <CareerMilestones />

        {/* AI Insights Panel */}
        <AIInsightsPanel />

        {/* Future AI Features */}
        <FutureAISkillsFeatures />
      </div>
    </CandidateLayout>
  );
}
