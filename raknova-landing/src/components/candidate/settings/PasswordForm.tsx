import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { PasswordStrengthIndicator } from "@/components/auth/PasswordStrengthIndicator";
import { validatePassword, validateConfirmPassword } from "@/utils/validation";

export function PasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    const newErrors: Record<string, string | null> = {
      currentPassword: !currentPassword ? "Current password is required." : null,
      newPassword: validatePassword(newPassword),
      confirmPassword: validateConfirmPassword(newPassword, confirmPassword),
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some((e) => e !== null)) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
      {success && (
        <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm">Password updated successfully!</div>
      )}
      <PasswordInput value={currentPassword} onChange={setCurrentPassword} label="Current Password" error={errors.currentPassword} />
      <PasswordInput value={newPassword} onChange={setNewPassword} label="New Password" error={errors.newPassword} />
      <PasswordStrengthIndicator password={newPassword} />
      <PasswordInput value={confirmPassword} onChange={setConfirmPassword} label="Confirm New Password" error={errors.confirmPassword} />
      <Button variant="primary" onClick={handleSave} loading={saving}>Update Password</Button>
    </div>
  );
}
