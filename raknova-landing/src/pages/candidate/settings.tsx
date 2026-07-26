import { CandidateLayout } from "@/components/candidate/layout/CandidateLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProfileSettings } from "@/components/candidate/settings/ProfileSettings";
import { AccountSettings } from "@/components/candidate/settings/AccountSettings";
import { NotificationPreferences } from "@/components/candidate/settings/NotificationPreferences";
import { PrivacySettings } from "@/components/candidate/settings/PrivacySettings";
import { AppearanceSettings } from "@/components/candidate/settings/AppearanceSettings";
import { LanguageSettings } from "@/components/candidate/settings/LanguageSettings";
import { SecuritySettings } from "@/components/candidate/settings/SecuritySettings";
import { AccountActions } from "@/components/candidate/settings/AccountActions";

export default function SettingsPage() {
  return (
    <CandidateLayout>
      <Breadcrumb items={[{ label: "Settings" }]} className="mb-4" />

      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Settings</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your account and preferences</p>
      </div>

      <div className="max-w-2xl space-y-6">
        <ProfileSettings />
        <AccountSettings />
        <NotificationPreferences />
        <PrivacySettings />
        <AppearanceSettings />
        <LanguageSettings />
        <SecuritySettings />
        <AccountActions />
      </div>
    </CandidateLayout>
  );
}
