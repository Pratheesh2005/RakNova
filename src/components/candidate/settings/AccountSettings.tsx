import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { validateEmail, validatePhone, validatePassword, validateConfirmPassword } from "@/utils/validation";
import { cn } from "@/utils/cn";

export function AccountSettings() {
  const [emailModal, setEmailModal] = useState(false);
  const [phoneModal, setPhoneModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);

  // Email state
  const [email, setEmail] = useState("john.doe@example.com");
  const [emailError, setEmailError] = useState<string | null>(null);

  // Phone state
  const [phone, setPhone] = useState("9876543210");
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneError, setPhoneError] = useState<string | null>(null);

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string | null>>({});

  const handleSaveEmail = () => {
    const error = validateEmail(email);
    setEmailError(error);
    if (!error) setEmailModal(false);
  };

  const handleSavePhone = () => {
    const error = validatePhone(phone);
    setPhoneError(error);
    if (!error) setPhoneModal(false);
  };

  const handleSavePassword = () => {
    const errors = {
      currentPassword: !currentPassword ? "Current password is required" : null,
      newPassword: validatePassword(newPassword),
      confirmPassword: validateConfirmPassword(newPassword, confirmPassword),
    };
    setPasswordErrors(errors);
    if (!Object.values(errors).some((e) => e !== null)) {
      setPasswordModal(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Account</h3>
      <div className="space-y-4">
        {/* Email */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">Email</p>
            <p className="text-xs text-gray-500">{email}</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setEmailModal(true)}>Change</Button>
        </div>
        <hr className="border-gray-100" />

        {/* Phone */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">Phone Number</p>
            <p className="text-xs text-gray-500">{countryCode} {phone}</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setPhoneModal(true)}>Change</Button>
        </div>
        <hr className="border-gray-100" />

        {/* Password */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">Password</p>
            <p className="text-xs text-gray-500">Last changed 3 months ago</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setPasswordModal(true)}>Change</Button>
        </div>
      </div>

      {/* Email Modal */}
      <Modal isOpen={emailModal} onClose={() => setEmailModal(false)} title="Change Email">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={cn("w-full px-4 py-2.5 border rounded-lg", emailError ? "border-red-300" : "border-gray-300")} />
            {emailError && <p className="text-sm text-red-600 mt-1">{emailError}</p>}
          </div>
          <Button variant="primary" size="sm" className="w-full" onClick={handleSaveEmail}>Save</Button>
        </div>
      </Modal>

      {/* Phone Modal */}
      <Modal isOpen={phoneModal} onClose={() => setPhoneModal(false)} title="Change Phone Number">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <div className="flex gap-2">
              <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)} className="px-3 py-2.5 border border-gray-300 rounded-lg w-[100px]">
                <option value="+91">+91</option><option value="+1">+1</option><option value="+44">+44</option>
              </select>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={cn("flex-1 px-4 py-2.5 border rounded-lg", phoneError ? "border-red-300" : "border-gray-300")} />
            </div>
            {phoneError && <p className="text-sm text-red-600 mt-1">{phoneError}</p>}
          </div>
          <Button variant="primary" size="sm" className="w-full" onClick={handleSavePhone}>Save</Button>
        </div>
      </Modal>

      {/* Password Modal */}
      <Modal isOpen={passwordModal} onClose={() => setPasswordModal(false)} title="Change Password">
        <div className="space-y-3">
          <PasswordInput value={currentPassword} onChange={setCurrentPassword} label="Current Password" error={passwordErrors.currentPassword} />
          <PasswordInput value={newPassword} onChange={setNewPassword} label="New Password" error={passwordErrors.newPassword} />
          <PasswordInput value={confirmPassword} onChange={setConfirmPassword} label="Confirm Password" error={passwordErrors.confirmPassword} />
          <Button variant="primary" size="sm" className="w-full" onClick={handleSavePassword}>Update Password</Button>
        </div>
      </Modal>
    </div>
  );
}
