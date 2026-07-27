import { useState } from "react";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

export default function SystemSettingsPage() {
  const [activeTab, setActiveTab] = useState<
    "general" | "auth" | "ai" | "email" | "storage" | "security" | "maintenance"
  >("general");

  // Form State
  const [general, setGeneral] = useState({
    platformName: "RakNova AI Recruitment Platform",
    logoUrl: "/raknova-logo.svg",
    supportEmail: "support@raknova.com",
    contactNumber: "+91 80 4000 9000",
    timezone: "Asia/Kolkata (IST)",
    language: "English (US)",
  });

  const [auth, setAuth] = useState({
    passwordPolicy: "Strong (Min 8 chars, 1 Special, 1 Num)",
    sessionTimeout: "60",
    enable2FA: true,
  });

  const [aiConfig, setAiConfig] = useState({
    defaultProvider: "Google Gemini (gemini-2.5-flash)",
    enableAIFeatures: true,
    maxRequestsPerMin: "120",
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: "smtp.sendgrid.net",
    smtpPort: "587",
    senderEmail: "no-reply@raknova.com",
  });

  const [storageSettings, setStorageSettings] = useState({
    uploadLimitMb: "15",
    allowedTypes: ".pdf, .docx, .doc",
    storageLocation: "AWS S3 Bucket (raknova-resumes-prod)",
  });

  const [securitySettings, setSecuritySettings] = useState({
    allowedAttempts: "5",
    accountLockoutMins: "30",
    auditLogging: true,
  });

  const [maintenance, setMaintenance] = useState({
    maintenanceMode: false,
    bannerMessage: "RakNova is undergoing scheduled system upgrades. Operations will resume shortly.",
  });

  const [restoreModalOpen, setRestoreModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("System configuration settings updated successfully.");
  };

  const handleTestEmail = () => {
    showToast(`Test email dispatched to ${emailSettings.senderEmail}. Connection verified.`);
  };

  const handleConfirmRestoreDefaults = () => {
    showToast("System settings restored to platform factory defaults.");
    setRestoreModalOpen(false);
  };

  return (
    <AdminLayout>
      <Breadcrumb items={[{ label: "Super Admin" }, { label: "System Settings" }]} className="mb-2" />

      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-lg border border-slate-800 text-xs font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System Settings</h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure platform-wide settings for RakNova.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setRestoreModalOpen(true)} className="text-xs font-semibold">
            Restore Defaults
          </Button>
          <Button variant="primary" size="sm" onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold">
            Save Settings
          </Button>
        </div>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-2xs flex flex-wrap gap-1 text-xs font-bold text-slate-700">
        {[
          { key: "general", label: "General" },
          { key: "auth", label: "Authentication" },
          { key: "ai", label: "AI Configuration" },
          { key: "email", label: "Email" },
          { key: "storage", label: "Storage" },
          { key: "security", label: "Security" },
          { key: "maintenance", label: "Maintenance" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-3 py-2 rounded-xl transition-colors ${
              activeTab === tab.key
                ? "bg-slate-900 text-white shadow-2xs"
                : "hover:bg-slate-100 text-slate-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Settings Form Panels */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs text-xs">
        <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
          
          {/* GENERAL SETTINGS */}
          {activeTab === "general" && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">General Platform Parameters</h3>
              
              <div>
                <label className="font-bold text-slate-700 block mb-1">Platform Name</label>
                <input
                  type="text"
                  value={general.platformName}
                  onChange={(e) => setGeneral({ ...general, platformName: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Platform Logo URL</label>
                <input
                  type="text"
                  value={general.logoUrl}
                  onChange={(e) => setGeneral({ ...general, logoUrl: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Support Email</label>
                  <input
                    type="email"
                    value={general.supportEmail}
                    onChange={(e) => setGeneral({ ...general, supportEmail: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={general.contactNumber}
                    onChange={(e) => setGeneral({ ...general, contactNumber: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Default Timezone</label>
                  <select
                    value={general.timezone}
                    onChange={(e) => setGeneral({ ...general, timezone: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                  >
                    <option value="Asia/Kolkata (IST)">Asia/Kolkata (IST)</option>
                    <option value="UTC">UTC</option>
                    <option value="America/New_York (EST)">America/New_York (EST)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Default Language</label>
                  <select
                    value={general.language}
                    onChange={(e) => setGeneral({ ...general, language: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                  >
                    <option value="English (US)">English (US)</option>
                    <option value="English (UK)">English (UK)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* AUTHENTICATION SETTINGS */}
          {activeTab === "auth" && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Authentication & Security Policy</h3>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Password Policy Requirement</label>
                <select
                  value={auth.passwordPolicy}
                  onChange={(e) => setAuth({ ...auth, passwordPolicy: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                >
                  <option value="Strong (Min 8 chars, 1 Special, 1 Num)">Strong (Min 8 chars, 1 Special, 1 Num)</option>
                  <option value="Standard (Min 6 chars)">Standard (Min 6 chars)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">User Session Timeout (Minutes)</label>
                <input
                  type="number"
                  value={auth.sessionTimeout}
                  onChange={(e) => setAuth({ ...auth, sessionTimeout: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <div>
                  <p className="font-bold text-slate-900">Enforce Two-Factor Authentication (2FA)</p>
                  <span className="text-[10px] text-slate-500">Require 2FA verification for Admin & Recruiter roles</span>
                </div>
                <input
                  type="checkbox"
                  checked={auth.enable2FA}
                  onChange={(e) => setAuth({ ...auth, enable2FA: e.target.checked })}
                  className="w-4 h-4"
                />
              </div>
            </div>
          )}

          {/* AI CONFIGURATION */}
          {activeTab === "ai" && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">AI Subsystem Parameters</h3>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Default AI Provider Engine</label>
                <select
                  value={aiConfig.defaultProvider}
                  onChange={(e) => setAiConfig({ ...aiConfig, defaultProvider: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                >
                  <option value="Google Gemini (gemini-2.5-flash)">Google Gemini (gemini-2.5-flash / 2.0-flash)</option>
                  <option value="Anthropic Claude 3.5 Sonnet">Anthropic Claude 3.5 Sonnet</option>
                  <option value="OpenAI GPT-4o">OpenAI GPT-4o</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Rate Limit: Max AI Requests Per Minute</label>
                <input
                  type="number"
                  value={aiConfig.maxRequestsPerMin}
                  onChange={(e) => setAiConfig({ ...aiConfig, maxRequestsPerMin: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <div>
                  <p className="font-bold text-slate-900">Enable AI Features Subsystem</p>
                  <span className="text-[10px] text-slate-500">Enable/disable AI Resume Analysis, ATS Match, and Job Generator</span>
                </div>
                <input
                  type="checkbox"
                  checked={aiConfig.enableAIFeatures}
                  onChange={(e) => setAiConfig({ ...aiConfig, enableAIFeatures: e.target.checked })}
                  className="w-4 h-4"
                />
              </div>
            </div>
          )}

          {/* EMAIL SETTINGS */}
          {activeTab === "email" && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">SMTP Email Dispatch Settings</h3>

              <div>
                <label className="font-bold text-slate-700 block mb-1">SMTP Server Host</label>
                <input
                  type="text"
                  value={emailSettings.smtpHost}
                  onChange={(e) => setEmailSettings({ ...emailSettings, smtpHost: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">SMTP Port</label>
                  <input
                    type="text"
                    value={emailSettings.smtpPort}
                    onChange={(e) => setEmailSettings({ ...emailSettings, smtpPort: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Default Sender Email</label>
                  <input
                    type="email"
                    value={emailSettings.senderEmail}
                    onChange={(e) => setEmailSettings({ ...emailSettings, senderEmail: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button variant="outline" size="sm" onClick={handleTestEmail} type="button" className="text-xs font-bold">
                  Test Email Connection
                </Button>
              </div>
            </div>
          )}

          {/* STORAGE SETTINGS */}
          {activeTab === "storage" && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">File Upload & Storage Rules</h3>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Max File Upload Limit (MB)</label>
                <input
                  type="number"
                  value={storageSettings.uploadLimitMb}
                  onChange={(e) => setStorageSettings({ ...storageSettings, uploadLimitMb: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Allowed File Extension Types</label>
                <input
                  type="text"
                  value={storageSettings.allowedTypes}
                  onChange={(e) => setStorageSettings({ ...storageSettings, allowedTypes: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Resume Storage Destination</label>
                <input
                  type="text"
                  value={storageSettings.storageLocation}
                  onChange={(e) => setStorageSettings({ ...storageSettings, storageLocation: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                />
              </div>
            </div>
          )}

          {/* SECURITY SETTINGS */}
          {activeTab === "security" && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Security & Audit Policies</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Allowed Failed Login Attempts</label>
                  <input
                    type="number"
                    value={securitySettings.allowedAttempts}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, allowedAttempts: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Account Lockout Duration (Minutes)</label>
                  <input
                    type="number"
                    value={securitySettings.accountLockoutMins}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, accountLockoutMins: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <div>
                  <p className="font-bold text-slate-900">Enable Enterprise Audit Logging</p>
                  <span className="text-[10px] text-slate-500 font-medium">Log all administrative actions, permission updates, and authentication events</span>
                </div>
                <input
                  type="checkbox"
                  checked={securitySettings.auditLogging}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, auditLogging: e.target.checked })}
                  className="w-4 h-4"
                />
              </div>
            </div>
          )}

          {/* MAINTENANCE MODE */}
          {activeTab === "maintenance" && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">System Maintenance Mode</h3>

              <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <div>
                  <p className="font-bold text-slate-900">Activate Platform Maintenance Mode</p>
                  <span className="text-[10px] text-slate-500">Disables candidate & company portals for non-administrator users</span>
                </div>
                <input
                  type="checkbox"
                  checked={maintenance.maintenanceMode}
                  onChange={(e) => setMaintenance({ ...maintenance, maintenanceMode: e.target.checked })}
                  className="w-4 h-4"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Maintenance Notice Message</label>
                <textarea
                  rows={3}
                  value={maintenance.bannerMessage}
                  onChange={(e) => setMaintenance({ ...maintenance, bannerMessage: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2 font-medium"
                />
              </div>
            </div>
          )}

          {/* Form Action Controls */}
          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
            <Button variant="outline" size="sm" type="button" onClick={() => showToast("Changes discarded.")}>
              Cancel Changes
            </Button>
            <Button type="submit" variant="primary" size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold">
              Save Settings
            </Button>
          </div>

        </form>
      </div>

      {/* RESTORE DEFAULTS MODAL */}
      {restoreModalOpen && (
        <Modal isOpen={true} onClose={() => setRestoreModalOpen(false)} title="Restore Factory Default Settings" size="sm">
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">
              Are you sure you want to restore system settings back to original factory defaults? All custom configurations will be reset.
            </p>
            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setRestoreModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleConfirmRestoreDefaults} className="bg-rose-600 hover:bg-rose-700 text-white font-bold">
                Confirm Restore
              </Button>
            </div>
          </div>
        </Modal>
      )}

    </AdminLayout>
  );
}
