import { useState } from "react";
import { CandidateLayout } from "@/components/candidate/layout/CandidateLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Tabs } from "@/components/ui/Tabs";
import { ProfileHeader } from "@/components/candidate/profile/ProfileHeader";
import { PersonalInfoForm } from "@/components/candidate/profile/PersonalInfoForm";
import { EducationForm } from "@/components/candidate/profile/EducationForm";
import { ExperienceForm } from "@/components/candidate/profile/ExperienceForm";
import { SkillsForm } from "@/components/candidate/profile/SkillsForm";
import { CertificationsForm } from "@/components/candidate/profile/CertificationsForm";
import { ProjectsForm } from "@/components/candidate/profile/ProjectsForm";
import { LanguagesForm } from "@/components/candidate/profile/LanguagesForm";
import { ResumeCard } from "@/components/candidate/profile/ResumeCard";
import { SocialLinksForm } from "@/components/candidate/profile/SocialLinksForm";
import { AIProfileInsights } from "@/components/candidate/profile/AIProfileInsights";
import { ProfileCompletion } from "@/components/candidate/profile/ProfileCompletion";
import { AddressForm } from "@/components/candidate/profile/AddressForm";

const tabs = [
  { id: "personal", label: "Personal Info" },
  { id: "address", label: "Address" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "languages", label: "Languages" },
  { id: "resume", label: "Resume" },
  { id: "social", label: "Social Links" },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <CandidateLayout>
      <Breadcrumb items={[{ label: "My Profile" }]} className="mb-4" />

      <div className="space-y-6">
        {/* Profile Header Banner */}
        <ProfileHeader />

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Form Content (Left 2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-6" />

              <div className="pt-2">
                {activeTab === "personal" && <PersonalInfoForm />}
                {activeTab === "address" && <AddressForm />}
                {activeTab === "education" && <EducationForm />}
                {activeTab === "experience" && <ExperienceForm />}
                {activeTab === "skills" && <SkillsForm />}
                {activeTab === "projects" && <ProjectsForm />}
                {activeTab === "certifications" && <CertificationsForm />}
                {activeTab === "languages" && <LanguagesForm />}
                {activeTab === "resume" && <ResumeCard />}
                {activeTab === "social" && <SocialLinksForm />}
              </div>
            </div>
          </div>

          {/* Right Sidebar Widget (Profile Completion & AI Insights) */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <ProfileCompletion />
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <AIProfileInsights />
            </div>
          </div>
        </div>
      </div>
    </CandidateLayout>
  );
}
